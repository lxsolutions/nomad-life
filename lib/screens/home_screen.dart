import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/driver_service.dart';
import '../widgets/driver_list.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    // Load mock data for development
    Future.microtask(() => 
      Provider.of<DriverService>(context, listen: false).loadMockDrivers()
    );
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Drivers'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Recent Rides'),
            Tab(text: 'My Drivers'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: const [
          DriverList(sortBy: 'recent'),
          DriverList(sortBy: 'rating'),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // TODO: Implement mock ride completion
          _showRideReviewDialog();
        },
        child: const Icon(Icons.add),
      ),
    );
  }

  void _showRideReviewDialog() {
    showDialog(
      context: context,
      builder: (context) => const RideReviewDialog(),
    );
  }
}

class RideReviewDialog extends StatefulWidget {
  const RideReviewDialog({super.key});

  @override
  State<RideReviewDialog> createState() => _RideReviewDialogState();
}

class _RideReviewDialogState extends State<RideReviewDialog> {
  double driverRating = 0;
  double cleanlinessRating = 0;
  double drivingRating = 0;
  double politenessRating = 0;
  final TextEditingController _notesController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Rate Your Ride'),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _buildRatingRow('Driver Rating', driverRating, (rating) {
              setState(() => driverRating = rating);
            }),
            _buildRatingRow('Cleanliness', cleanlinessRating, (rating) {
              setState(() => cleanlinessRating = rating);
            }),
            _buildRatingRow('Driving', drivingRating, (rating) {
              setState(() => drivingRating = rating);
            }),
            _buildRatingRow('Politeness', politenessRating, (rating) {
              setState(() => politenessRating = rating);
            }),
            TextField(
              controller: _notesController,
              maxLength: 100,
              decoration: const InputDecoration(
                labelText: 'Notes',
                hintText: 'Add optional notes...',
              ),
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: _submitReview,
          child: const Text('Save Driver'),
        ),
      ],
    );
  }

  Widget _buildRatingRow(String label, double rating, Function(double) onChanged) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label),
        Row(
          children: List.generate(5, (index) {
            return IconButton(
              icon: Icon(
                index < rating ? Icons.star : Icons.star_border,
                color: Theme.of(context).primaryColor,
              ),
              onPressed: () => onChanged(index + 1.0),
            );
          }),
        ),
      ],
    );
  }

  void _submitReview() {
    // TODO: Implement saving to DriverService
    Navigator.pop(context);
  }
}