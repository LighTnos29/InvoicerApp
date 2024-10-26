import React, { useState } from 'react';
import { View, Text, TextInput, CheckBox, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Register = () => {
  const [isGSTRegistered, setIsGSTRegistered] = useState(false);
  const [formData, setFormData] = useState({
    gstNo: '',
    traderName: '',
    address: '',
    pan: '',
    entityType: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const dataToSubmit = {
      gstRegistered: isGSTRegistered,
      gstNo: formData.gstNo,
      traderName: formData.traderName,
      address: formData.address,
      pan: formData.pan,
      entityType: formData.entityType,
    };

    fetch('/link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Account</Text>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isGSTRegistered}
          onValueChange={setIsGSTRegistered}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>GST Registered</Text>
      </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f5f9',
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    color: '#3a3f47',
    marginBottom: 25,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#3a3f47',
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: '#5f6368',
    marginBottom: 5,
  },
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Register;
