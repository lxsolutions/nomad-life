import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/driver.dart';

class DriverService extends ChangeNotifier {
  final List<Driver> _savedDrivers = [];
  List<Driver> get savedDrivers => _savedDrivers;

  // Mock data for initial development
  void loadMockDrivers() {
    final mockDrivers = [
      Driver(
        id: '1',
        name: 'Somchai K.',
        carModel: 'Toyota Camry',
        rating: 4.8,
        ratings: {
          'cleanliness': 5.0,
          'driving': 4.8,
          'politeness': 4.6,
        },
        lastRideDate: DateTime.now().subtract(const Duration(days: 2)),
      ),
      Driver(
        id: '2',
        name: 'Pranee S.',
        carModel: 'Honda City',
        rating: 4.5,
        ratings: {
          'cleanliness': 4.5,
          'driving': 4.5,
          'politeness': 4.5,
        },
        lastRideDate: DateTime.now().subtract(const Duration(days: 5)),
      ),
    ];

    _savedDrivers.addAll(mockDrivers);
    notifyListeners();
  }

  Future<void> saveDriver(Driver driver) async {
    // TODO: Implement Firebase integration
    _savedDrivers.add(driver);
    notifyListeners();
  }

  Future<String> checkDriverAvailability(String driverId) async {
    // Mock API call
    await Future.delayed(const Duration(seconds: 1));
    return ['online', 'offline'][DateTime.now().second % 2];
  }

  List<Driver> getSortedDrivers({String sortBy = 'rating'}) {
    final sorted = List<Driver>.from(_savedDrivers);
    switch (sortBy) {
      case 'rating':
        sorted.sort((a, b) => b.rating.compareTo(a.rating));
        break;
      case 'recent':
        sorted.sort((a, b) => b.lastRideDate.compareTo(a.lastRideDate));
        break;
      // TODO: Add more sorting options
    }
    return sorted;
  }
}