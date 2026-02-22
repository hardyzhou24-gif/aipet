import 'package:flutter/foundation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../services/auth_service.dart';

class AuthProvider extends ChangeNotifier {
  final AuthService _authService;
  User? _user;
  bool _isLoading = true;
  bool _isMockAdmin = false;

  AuthProvider(this._authService) {
    _initializeAuth();
  }

  User? get user => _user;
  bool get isLoading => _isLoading;
  bool get isMockAdmin => _isMockAdmin;

  Future<void> _initializeAuth() async {
    _isMockAdmin = await _authService.isMockAdmin();
    if (_isMockAdmin) {
      _user = const User(
        id: 'admin_mock_id',
        appMetadata: {},
        userMetadata: {'full_name': '超级管理员', 'phone': '13888888888'},
        aud: 'authenticated',
        createdAt: '2026-01-01T00:00:00.000Z',
        email: 'admin@admin.com',
      );
      _isLoading = false;
      notifyListeners();
    } else {
      Supabase.instance.client.auth.onAuthStateChange.listen((data) {
        if (_isMockAdmin) return;
        _user = data.session?.user;
        _isLoading = false;
        notifyListeners();
      });
    }
  }

  Future<String?> signIn(String email, String password) async {
    final result = await _authService.signIn(email: email, password: password);
    if (result.error == null) {
      _isMockAdmin = await _authService.isMockAdmin();
      if (_isMockAdmin) {
        _user = const User(
          id: 'admin_mock_id',
          appMetadata: {},
          userMetadata: {'full_name': '超级管理员', 'phone': '13888888888'},
          aud: 'authenticated',
          createdAt: '2026-01-01T00:00:00.000Z',
          email: 'admin@admin.com',
        );
        notifyListeners();
      }
    }
    return result.error;
  }

  Future<String?> signUp(
    String email,
    String password,
    String fullName,
    String phone,
  ) async {
    final result = await _authService.signUp(
      email: email,
      password: password,
      fullName: fullName,
      phone: phone,
    );
    return result.error;
  }

  Future<void> signOut() async {
    await _authService.signOut();
    if (_isMockAdmin) {
      _isMockAdmin = false;
      _user = null;
      notifyListeners();
    }
  }
}
