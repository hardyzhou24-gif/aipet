import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';

import 'widgets/app_theme.dart';
import 'services/supabase_service.dart';
import 'services/auth_service.dart';
import 'services/pet_service.dart';
import 'providers/auth_provider.dart';
import 'providers/pet_provider.dart';

import 'screens/home_screen.dart';
import 'screens/pet_detail_screen.dart';
import 'screens/login_screen.dart';
import 'screens/register_screen.dart';
import 'screens/upload_pet_screen.dart';
import 'screens/adoption_form_screen.dart';
import 'screens/profile_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // 初始化环境配置和 Supabase
  await SupabaseService.initialize();

  // 初始化服务
  final authService = AuthService(SupabaseService.client);
  final petService = PetService(SupabaseService.client);

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider(authService)),
        ChangeNotifierProvider(create: (_) => PetProvider(petService)),
      ],
      child: const PetAdoptionApp(),
    ),
  );
}

class PetAdoptionApp extends StatelessWidget {
  const PetAdoptionApp({super.key});

  @override
  Widget build(BuildContext context) {
    final router = GoRouter(
      initialLocation: '/',
      routes: [
        GoRoute(path: '/', builder: (context, state) => const HomeScreen()),
        GoRoute(
          path: '/pet/:id',
          builder: (context, state) =>
              PetDetailScreen(id: state.pathParameters['id']!),
        ),
        GoRoute(
          path: '/adopt/:id',
          builder: (context, state) =>
              AdoptionFormScreen(petId: state.pathParameters['id']!),
        ),
        GoRoute(
          path: '/login',
          builder: (context, state) => const LoginScreen(),
        ),
        GoRoute(
          path: '/register',
          builder: (context, state) => const RegisterScreen(),
        ),
        GoRoute(
          path: '/upload',
          builder: (context, state) => const UploadPetScreen(),
        ),
        GoRoute(
          path: '/profile',
          builder: (context, state) => const ProfileScreen(),
        ),
      ],
    );

    return MaterialApp.router(
      title: '宠物领养平台',
      theme: AppTheme.light(),
      darkTheme: AppTheme.dark(),
      themeMode: ThemeMode.system,
      routerConfig: router,
      debugShowCheckedModeBanner: false,
    );
  }
}
