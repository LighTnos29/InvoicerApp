import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
  const [isGSTRegistered, setIsGSTRegistered] = useState(false);
  const [formData, setFormData] = useState({
    gstNo: '',
    traderName: '',
    address: '',
    pan: '',
    entityType: '',
    email: '',
    Password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setErrorMessage(''); // Reset error message on each submit attempt
    const dataToSubmit = {
      gstRegistered: isGSTRegistered,
      email: formData.email,
      gstNo: formData.gstNo,
      traderName: formData.traderName,
      address: formData.address,
      pan: formData.pan,
      entityType: formData.entityType,
      password: formData.Password
    };
    try {
      const response = await fetch('http://127.0.0.1:5000/api/signup', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();

      if (response.ok) {
        navigation.navigate('Home', { user_id: result.user_id });
      } else {
        setErrorMessage(result.message); // Set error message if response not OK
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Create Your Account</Text>

      {errorMessage ? (  // Display error message if present
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={formData.Password}
          onChangeText={(text) => handleInputChange('Password', text)}
          secureTextEntry
        />
      </View>

      <TouchableOpacity 
        onPress={() => setIsGSTRegistered(!isGSTRegistered)} 
        style={styles.checkboxContainer}
      >
        <View style={[styles.checkbox, isGSTRegistered && styles.checkboxChecked]} />
        <Text style={styles.checkboxLabel}>GST Registered</Text>
      </TouchableOpacity>

      {isGSTRegistered && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>GST No:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter GST No"
            value={formData.gstNo}
            onChangeText={(text) => handleInputChange('gstNo', text)}
          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Trader Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Trader Name"
          value={formData.traderName}
          onChangeText={(text) => handleInputChange('traderName', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Address"
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>PAN:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter PAN"
          value={formData.pan}
          onChangeText={(text) => handleInputChange('pan', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Entity Type:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Entity Type"
          value={formData.entityType}
          onChangeText={(text) => handleInputChange('entityType', text)}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.registerLink} 
        onPress={() => navigation.navigate('login')}
      >
        <Text style={styles.registerText}>Have an account? Sign in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Main container for scrolling
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f2f5f9',
    padding: 24,
    justifyContent: 'center',
  },
  // Header style
  header: {
    fontSize: 30,
    fontWeight: '700',
    color: '#3a3f47',
    marginBottom: 25,
    textAlign: 'center',
  },
  // Checkbox container with flex direction
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
  },
  // Checkbox style
  checkbox: {
    width: 24,
    height: 24,
    borderColor: '#e2e8f0',
    borderWidth: 3,
    borderRadius: 4,
    marginRight: 10, // Ensures spacing next to label
  },
  // Checked style for checkbox
  checkboxChecked: {
    backgroundColor: '#7e5be3', // Color when checked
    borderColor: '#7e5be3', // Match border color with background when checked
  },
  // Checkbox label styling
  checkboxLabel: {
    fontSize: 16,
    color: '#3a3f47',
  },
  // Input container style
  inputContainer: {
    marginBottom: 18,
  },
  // Label style for inputs
  label: {
    fontSize: 14,
    color: '#5f6368',
    marginBottom: 5,
  },
  // Input field styling
  input: {
    height: 55,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#3a3f47',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  // Button styling
  button: {
    backgroundColor: '#7e5be3',
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 15,
    shadowColor: '#7e5be3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  // Button text styling
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default Register;
