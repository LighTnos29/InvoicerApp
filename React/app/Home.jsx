import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = ({ route }) => {
  const userId = route?.params?.user_id; // Safely accessing user_id with optional chaining
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Logged Out", "You have been logged out successfully.");
    navigation.navigate('Login');  // Navigates back to the Login screen
  };

  return (
    <View style={styles.container}>
      {userId ? (
        <Text style={styles.welcomeText}>Welcome, User ID: {userId}</Text>
      ) : (
        <Text style={styles.welcomeText}>Welcome, Guest!</Text>
      )}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f5f9',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3a3f47',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#7e5be3',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Home;
