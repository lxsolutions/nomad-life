



import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'services/driver_service.dart';
import 'services/firebase_service.dart';
import 'services/supabase_service.dart';
import 'widgets/auth_wrapper.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/phone_login_screen.dart';
import 'screens/auth/signup_screen.dart';
import 'screens/home_screen.dart';
import 'screens/settings_screen.dart';
import 'utils/app_localizations.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Supabase
  await Supabase.initialize(
    url: const String.fromEnvironment('SUPABASE_URL', defaultValue: 'https://your-project.supabase.co'),
    anonKey: const String.fromEnvironment('SUPABASE_ANON_KEY', defaultValue: 'your-anon-key'),
  );

  // Initialize Firebase (for push notifications and fallback auth)
  await Firebase.initializeApp(
    options: const FirebaseOptions(
      apiKey: "YOUR_API_KEY",
      authDomain: "my-drivers-app.firebaseapp.com",
      projectId: "my-drivers-app",
      storageBucket: "my-drivers-app.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    ),
  );

  runApp(const MyDriversApp());
}

class MyDriversApp extends StatelessWidget {
  const MyDriversApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => DriverService()),
        Provider<SupabaseService>(
          create: (_) => SupabaseService(Supabase.instance.client),
        ),
      ],
      child: MaterialApp(
        title: 'My Drivers',
        theme: AppTheme.lightTheme,
        darkTheme: AppTheme.darkTheme,
        localizationsDelegates: const [
          AppLocalizations.delegate,
          GlobalMaterialLocalizations.delegate,
          GlobalWidgetsLocalizations.delegate,
          GlobalCupertinoLocalizations.delegate,
        ],
        supportedLocales: const [
          Locale('en', ''),
          Locale('th', ''),
        ],
        initialRoute: '/',
        routes: {
          '/': (context) => const AuthWrapper(),
          '/login': (context) => const PhoneLoginScreen(),
          '/otp-verification': (context) => OtpVerificationScreen(phone: ''),
          '/home': (context) => const HomeScreen(),
          '/settings': (context) => const SettingsScreen(),
        },
      ),
    );
  }
}


