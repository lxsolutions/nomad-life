import 'package:flutter/material.dart';

class AppLocalizations {
  final Locale locale;

  AppLocalizations(this.locale);

  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }

  static const LocalizationsDelegate<AppLocalizations> delegate = _AppLocalizationsDelegate();

  static final Map<String, Map<String, String>> _localizedValues = {
    'en': {
      'app_name': 'My Drivers',
      'recent_rides': 'Recent Rides',
      'my_drivers': 'My Drivers',
      'settings': 'Settings',
      'login': 'Login',
      'signup': 'Sign Up',
      'email': 'Email',
      'password': 'Password',
      'confirm_password': 'Confirm Password',
      'book_now': 'Book Now',
      'driver_offline': 'Driver is offline',
      'add_to_waitlist': 'Add to Waitlist',
      'find_similar': 'Find Similar',
      'save_driver': 'Save Driver',
      'rating': 'Rating',
      'cleanliness': 'Cleanliness',
      'driving_skill': 'Driving Skill',
      'politeness': 'Politeness',
      'notes': 'Notes',
      'auto_save_threshold': 'Auto-save Threshold',
      'language': 'Language',
      'preferred_traits': 'Preferred Traits',
      'non_smoker': 'Non-smoker',
      'quiet': 'Quiet',
      'conversational': 'Conversational',
      'local_expert': 'Local Expert',
      'english_speaker': 'English Speaker',
    },
    'th': {
      'app_name': 'คนขับของฉัน',
      'recent_rides': 'การเดินทางล่าสุด',
      'my_drivers': 'คนขับของฉัน',
      'settings': 'ตั้งค่า',
      'login': 'เข้าสู่ระบบ',
      'signup': 'ลงทะเบียน',
      'email': 'อีเมล',
      'password': 'รหัสผ่าน',
      'confirm_password': 'ยืนยันรหัสผ่าน',
      'book_now': 'จองตอนนี้',
      'driver_offline': 'คนขับไม่ว่าง',
      'add_to_waitlist': 'เพิ่มในรายการรอ',
      'find_similar': 'หาคนขับที่คล้ายกัน',
      'save_driver': 'บันทึกคนขับ',
      'rating': 'คะแนน',
      'cleanliness': 'ความสะอาด',
      'driving_skill': 'ทักษะการขับขี่',
      'politeness': 'ความสุภาพ',
      'notes': 'บันทึก',
      'auto_save_threshold': 'เกณฑ์การบันทึกอัตโนมัติ',
      'language': 'ภาษา',
      'preferred_traits': 'คุณสมบัติที่ต้องการ',
      'non_smoker': 'ไม่สูบบุหรี่',
      'quiet': 'เงียบ',
      'conversational': 'ชอบพูดคุย',
      'local_expert': 'รู้จักเส้นทางดี',
      'english_speaker': 'พูดภาษาอังกฤษได้',
    },
  };

  String get appName => _localizedValues[locale.languageCode]!['app_name']!;
  String get recentRides => _localizedValues[locale.languageCode]!['recent_rides']!;
  String get myDrivers => _localizedValues[locale.languageCode]!['my_drivers']!;
  String get settings => _localizedValues[locale.languageCode]!['settings']!;
  String get login => _localizedValues[locale.languageCode]!['login']!;
  String get signup => _localizedValues[locale.languageCode]!['signup']!;
  String get email => _localizedValues[locale.languageCode]!['email']!;
  String get password => _localizedValues[locale.languageCode]!['password']!;
  String get confirmPassword => _localizedValues[locale.languageCode]!['confirm_password']!;
  String get bookNow => _localizedValues[locale.languageCode]!['book_now']!;
  String get driverOffline => _localizedValues[locale.languageCode]!['driver_offline']!;
  String get addToWaitlist => _localizedValues[locale.languageCode]!['add_to_waitlist']!;
  String get findSimilar => _localizedValues[locale.languageCode]!['find_similar']!;
  String get saveDriver => _localizedValues[locale.languageCode]!['save_driver']!;
  String get rating => _localizedValues[locale.languageCode]!['rating']!;
  String get cleanliness => _localizedValues[locale.languageCode]!['cleanliness']!;
  String get drivingSkill => _localizedValues[locale.languageCode]!['driving_skill']!;
  String get politeness => _localizedValues[locale.languageCode]!['politeness']!;
  String get notes => _localizedValues[locale.languageCode]!['notes']!;
  String get autoSaveThreshold => _localizedValues[locale.languageCode]!['auto_save_threshold']!;
  String get language => _localizedValues[locale.languageCode]!['language']!;
  String get preferredTraits => _localizedValues[locale.languageCode]!['preferred_traits']!;
  String get nonSmoker => _localizedValues[locale.languageCode]!['non_smoker']!;
  String get quiet => _localizedValues[locale.languageCode]!['quiet']!;
  String get conversational => _localizedValues[locale.languageCode]!['conversational']!;
  String get localExpert => _localizedValues[locale.languageCode]!['local_expert']!;
  String get englishSpeaker => _localizedValues[locale.languageCode]!['english_speaker']!;
}

class _AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) {
    return ['en', 'th'].contains(locale.languageCode);
  }

  @override
  Future<AppLocalizations> load(Locale locale) async {
    return AppLocalizations(locale);
  }

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}