
import { Stack } from 'expo-router';
import { TicketProvider } from '../context/TicketContext';

export default function RootLayout() {
  return (
    <TicketProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </TicketProvider>
  );
}
