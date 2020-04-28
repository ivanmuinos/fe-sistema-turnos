import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import RegisterForm from '../../components/Account/RegisterForm';

function Register(){
    return (
        <KeyboardAwareScrollView>
            <View style={styles.viewForm}>
                <RegisterForm />
            </View>
            
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    viewForm: {
        marginTop: 20,
        marginRight: 40,
        marginLeft: 40
    }
});

export default Register;
