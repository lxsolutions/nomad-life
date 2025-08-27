

export const metadata = {
  title: 'RentShield TH',
  description: 'Bangkok rental finder + lease-protection platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

