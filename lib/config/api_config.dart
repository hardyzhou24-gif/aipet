class ApiConfig {
  /// ---------- 数据接口 (Database Tables) ----------
  /// 在 Supabase 架构中，这些表名直接对应着后端的 RESTFUL 接口路径：
  /// GET/POST/PATCH/DELETE -> https://[SUPABASE_URL]/rest/v1/[tableName]
  
  // 宠物列表接口表
  static const String tablePets = 'pets';
  
  // 领养申请接口表
  static const String tableAdoptions = 'adoption_applications';
  
  // 收容机构接口表
  static const String tableShelters = 'shelters';


  /// ---------- 基础鉴权接口路径 (供参考) ----------
  /// App 实际使用了 _client.auth 内部方法直接处理，SDK 封装的对应端点为：
  /// 登录: POST https://[SUPABASE_URL]/auth/v1/token?grant_type=password
  /// 注册: POST https://[SUPABASE_URL]/auth/v1/signup
  /// 登出: POST https://[SUPABASE_URL]/auth/v1/logout
}
