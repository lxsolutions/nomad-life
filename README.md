# My Drivers

A Flutter application that allows users to save and re-book their favorite Grab drivers.

## Features

- Save trusted drivers from past rides
- Rate drivers on multiple criteria (cleanliness, driving skill, politeness)
- View saved drivers sorted by rating or recent rides
- Book available drivers directly
- Waitlist feature for offline drivers
- Multilingual support (English/Thai)
- Customizable preferences and settings

## Getting Started

### Prerequisites

- Flutter SDK (3.0.0 or higher)
- Dart SDK
- Android Studio / Xcode for mobile development
- Firebase account (for future implementation)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my_drivers
   ```

2. Install dependencies:
   ```bash
   flutter pub get
   ```

3. Run the app:
   ```bash
   flutter run
   ```

### Demo Flow

1. Launch the app
2. Navigate to "Recent Rides" tab to see mock data
3. Tap the + button to simulate rating a new driver
4. Rate the driver and add notes
5. View the saved driver in "My Drivers" tab
6. Try booking a driver to see availability simulation
7. Explore settings to customize preferences

## Project Structure

```
lib/
  ├── models/
  │   └── driver.dart
  ├── screens/
  │   ├── home_screen.dart
  │   └── settings_screen.dart
  ├── services/
  │   └── driver_service.dart
  ├── widgets/
  │   └── driver_list.dart
  └── main.dart
```

## Technical Notes

- Uses Provider for state management
- Mock API responses for driver availability
- Persistent settings with SharedPreferences
- Prepared for Firebase integration
- Material 3 design system

## Future Improvements

- Implement Firebase authentication and storage
- Add real-time driver tracking
- Integrate actual Grab API
- Add push notifications for driver availability
- Implement driver matching algorithm
- Add payment integration
- Expand language support