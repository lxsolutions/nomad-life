import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';
import 'screens/home_screen.dart';
import 'services/driver_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // TODO: Initialize Firebase
  // await Firebase.initializeApp();
  runApp(const MyDriversApp());
}

class MyDriversApp extends StatelessWidget {
  const MyDriversApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => DriverService()),
      ],
      child: MaterialApp(
        title: 'My Drivers',
        theme: ThemeData(
          primaryColor: const Color(0xFF00C853),
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xFF00C853),
            secondary: const Color(0xFFB0BEC5),
          ),
          useMaterial3: true,
        ),
        home: const HomeScreen(),
      ),
    );
  }
}