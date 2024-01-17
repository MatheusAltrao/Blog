import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '@/service/firebase';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],

    callbacks: {
        async signIn({ user }) {
            const { email } = user;
            const { name } = user;

            const userRef = collection(db, 'users');
            const qUsers = query(userRef, where('email', '==', email));
            const querySnapshotUsers = await getDocs(qUsers);

            if (querySnapshotUsers.docs.length > 0) {
                return true;
            } else {
                try {
                    await addDoc(collection(db, 'users'), {
                        name,
                        email,
                    });
                } catch (error) {
                    console.log(error);
                }
                return true;
            }
        },
    },

    secret: process.env.NEXTAUTH_SECRET as string,
};
