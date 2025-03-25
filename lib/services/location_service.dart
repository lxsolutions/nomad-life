import 'package:flutter/foundation.dart';
import 'package:geolocator/geolocator.dart';
import 'package:shared_preferences.dart';

class LocationService extends ChangeNotifier {
  Position? _currentPosition;
  bool _isLocationEnabled = false;
  final String _lastLatKey = 'last_latitude';
  final String _lastLngKey = 'last_longitude';

  Position? get currentPosition => _currentPosition;
  bool get isLocationEnabled => _isLocationEnabled;

  Future<void> initialize() async {
    await _loadLastKnownLocation();
    await checkLocationPermission();
  }

  Future<void> _loadLastKnownLocation() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final lat = prefs.getDouble(_lastLatKey);
      final lng = prefs.getDouble(_lastLngKey);
      
      if (lat != null && lng != null) {
        _currentPosition = Position(
          latitude: lat,
          longitude: lng,
          timestamp: DateTime.now(),
          accuracy: 0,
          altitude: 0,
          heading: 0,
          speed: 0,
          speedAccuracy: 0,
          altitudeAccuracy: 0,
          headingAccuracy: 0,
        );
      }
    } catch (e) {
      debugPrint('Error loading last known location: $e');
    }
  }

  Future<void> _saveCurrentLocation() async {
    if (_currentPosition == null) return;
    
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setDouble(_lastLatKey, _currentPosition!.latitude);
      await prefs.setDouble(_lastLngKey, _currentPosition!.longitude);
    } catch (e) {
      debugPrint('Error saving current location: $e');
    }
  }

  Future<bool> checkLocationPermission() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      _isLocationEnabled = false;
      notifyListeners();
      return false;
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        _isLocationEnabled = false;
        notifyListeners();
        return false;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      _isLocationEnabled = false;
      notifyListeners();
      return false;
    }

    _isLocationEnabled = true;
    notifyListeners();
    return true;
  }

  Future<Position?> getCurrentLocation() async {
    try {
      if (!_isLocationEnabled) {
        final hasPermission = await checkLocationPermission();
        if (!hasPermission) return null;
      }

      _currentPosition = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );
      
      await _saveCurrentLocation();
      notifyListeners();
      return _currentPosition;
    } catch (e) {
      debugPrint('Error getting current location: $e');
      return null;
    }
  }

  double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
    return Geolocator.distanceBetween(lat1, lon1, lat2, lon2);
  }

  // Mock driver locations for development
  Map<String, Position> getMockDriverLocations() {
    if (_currentPosition == null) return {};

    // Generate random positions within 5km radius of current location
    final random = DateTime.now().millisecondsSinceEpoch;
    return {
      '1': Position(
        latitude: _currentPosition!.latitude + (random % 100) / 10000,
        longitude: _currentPosition!.longitude + (random % 100) / 10000,
        timestamp: DateTime.now(),
        accuracy: 0,
        altitude: 0,
        heading: 0,
        speed: 0,
        speedAccuracy: 0,
        altitudeAccuracy: 0,
        headingAccuracy: 0,
      ),
      '2': Position(
        latitude: _currentPosition!.latitude - (random % 100) / 10000,
        longitude: _currentPosition!.longitude - (random % 100) / 10000,
        timestamp: DateTime.now(),
        accuracy: 0,
        altitude: 0,
        heading: 0,
        speed: 0,
        speedAccuracy: 0,
        altitudeAccuracy: 0,
        headingAccuracy: 0,
      ),
    };
  }
}