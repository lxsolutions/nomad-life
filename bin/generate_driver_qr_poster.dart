











import 'package:args/args.dart';
import '../lib/pdf/driver_qr_poster.dart';

void main(List<String> arguments) async {
  final parser = ArgParser()
    ..addOption('driver-id', abbr: 'd', help: 'Driver ID to generate poster for');

  final args = parser.parse(arguments);

  if (args['driver-id'] == null) {
    print('Error: --driver-id is required');
    return;
  }

  try {
    final driverId = args['driver-id'];
    final poster = DriverQRPoster(driverId);
    final pdf = await poster.generate();

    // Save to file
    final fileName = 'driver_${driverId}_qr_poster.pdf';
    print('Generating $fileName...');
    await Printing.savePdf(
      filename: fileName,
      document: pdf,
    );
    print('Poster generated successfully at $fileName');

  } catch (e) {
    print('Error generating poster: $e');
  }
}











