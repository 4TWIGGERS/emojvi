import { firebaseConfig } from 'env';
import { initializeApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
// import { collection } from 'firebase/firestore';

initializeApp(firebaseConfig);

const auth = getAuth();

export const verifyPhoneNumber = async (phoneNumber, recaptchaVerifier) => {
    try {
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
            phoneNumber,
            recaptchaVerifier.current
        );
        console.log('Verification code has been sent to your phone.');
        return verificationId;
    } catch (err) {
        console.log('err', err);
    }

    return null;
};

export const loginWithCredential = async (verificationId, verificationCode) => {
    try {
        const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
        await signInWithCredential(auth, credential);
    } catch (err) {
        console.log('err', err);
    }
};
