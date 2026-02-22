import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  final SupabaseClient _client;

  AuthService(this._client);

  /// 检查是否是模拟的管理员会话
  Future<bool> isMockAdmin() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool('mock_admin_logged_in') ?? false;
  }

  /// 登录，支持模拟 admin
  Future<({String? error})> signIn({
    required String email,
    required String password,
  }) async {
    if (email == 'admin@admin.com' && password == 'admin123') {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool('mock_admin_logged_in', true);
      return (error: null);
    }

    try {
      final res = await _client.auth.signInWithPassword(
        email: email,
        password: password,
      );
      if (res.user != null) return (error: null);
      return (error: '未知错误');
    } on AuthException catch (e) {
      return (error: e.message);
    } catch (e) {
      return (error: '网络连接异常，无法连接到验证服务器。请检查您的网络或者代理设置。');
    }
  }

  /// 注册
  Future<({String? error})> signUp({
    required String email,
    required String password,
    String? fullName,
    String? phone,
  }) async {
    try {
      final Map<String, dynamic> data = {};
      if (fullName != null && fullName.isNotEmpty) data['full_name'] = fullName;
      if (phone != null && phone.isNotEmpty) data['phone'] = phone;

      await _client.auth.signUp(
        email: email,
        password: password,
        data: data.isNotEmpty ? data : null,
      );
      return (error: null);
    } on AuthException catch (e) {
      return (error: e.message);
    } catch (e) {
      return (error: '网络连接异常，无法连接到验证服务器。请检查您的网络或者代理设置。');
    }
  }

  /// 退出登录
  Future<void> signOut() async {
    final isMock = await isMockAdmin();
    if (isMock) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove('mock_admin_logged_in');
      return;
    }
    await _client.auth.signOut();
  }
}
