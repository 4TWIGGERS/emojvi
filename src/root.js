import { firebaseConfig } from 'env';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import React, { useRef, useState } from 'react';
import { View, Button, TextInput, Text } from 'react-native';
import { Firebase } from 'services';

const attemptInvisibleVerification = false;

export default function Root() {
    const recaptchaVerifier = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState();
    const [verificationId, setVerificationId] = useState();
    const [verificationCode, setVerificationCode] = useState();

    console.log('verfic', verificationId);

    return (
        <View style={{ padding: 20, marginTop: 50 }}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                {...{ attemptInvisibleVerification, firebaseConfig }}
            />
            <Text style={{ marginTop: 20 }}>Enter phone number</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                placeholder='+1 999 999 9999'
                autoFocus
                autoCompleteType='tel'
                keyboardType='phone-pad'
                textContentType='telephoneNumber'
                onChangeText={setPhoneNumber}
            />
            <Button
                title='Send Verification Code'
                disabled={!phoneNumber}
                onPress={async () => {
                    setVerificationId(
                        await Firebase.verifyPhoneNumber(phoneNumber, recaptchaVerifier)
                    );
                }}
            />
            <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                editable={!!verificationId}
                placeholder='123456'
                onChangeText={setVerificationCode}
            />
            <Button
                title='Confirm Verification Code'
                disabled={!verificationId}
                onPress={() => Firebase.loginWithCredential(verificationId, verificationCode)}
            />
            {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
        </View>
    );
}
