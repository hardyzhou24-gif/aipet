import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/pet.dart';
import '../models/shelter.dart';
import '../config/api_config.dart';
import 'mock_data.dart';

class PetService {
  final SupabaseClient _client;

  PetService(this._client);

  /// 获取宠物列表，可按类型过滤
  Future<List<Pet>> getPets({String? type}) async {
    try {
      var query = _client.from(ApiConfig.tablePets).select('*, shelter:${ApiConfig.tableShelters}(*)');

      if (type != null && type != 'all') {
        query = query.eq('type', type);
      }

      final data = await query.order('created_at', ascending: false);
      final pets = (data as List<dynamic>)
          .map((row) => Pet.fromJson(Map<String, dynamic>.from(row as Map)))
          .toList();

      if (pets.isNotEmpty) return pets;
    } catch (e) {
      // Ignore errors, fall back to mock data
    }

    // Fallback to mock data
    final mockList = MockData.pets;
    if (type != null && type != 'all') {
      return mockList.where((p) => p.type == type).toList();
    }
    return mockList;
  }

  /// 获取单只宠物详情
  Future<Pet?> getPetById(String id) async {
    try {
      final data = await _client
          .from(ApiConfig.tablePets)
          .select('*, shelter:${ApiConfig.tableShelters}(*)')
          .eq('id', id)
          .single();
      return Pet.fromJson(Map<String, dynamic>.from(data as Map));
    } catch (e) {
      // Fallback to mock
    }

    try {
      return MockData.pets.firstWhere((p) => p.id == id);
    } catch (_) {
      return null;
    }
  }

  /// 提交领养申请
  Future<({bool success, String? error})> submitAdoption({
    required String petId,
    required String housingType,
    required String ownership,
    required String reason,
    required bool hasPets,
  }) async {
    try {
      final user = _client.auth.currentUser;
      if (user == null) return (success: false, error: '请先登录');

      await _client.from(ApiConfig.tableAdoptions).insert({
        'user_id': user.id,
        'pet_id': petId,
        'housing_type': housingType,
        'ownership': ownership,
        'reason': reason,
        'has_pets': hasPets,
        'status': 'pending',
      });
      return (success: true, error: null);
    } catch (e) {
      return (success: false, error: e.toString());
    }
  }
}
