import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';
import { query as q } from 'faunadb';
import { fauna } from '../services/fauna';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile }) {
            const { email } = user;
            const { name } = user;

            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(user.email),
                                ),
                            ),
                        ),

                        q.Create(q.Collection('users'), {
                            data: { email, name },
                        }),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email),
                            ),
                        ),
                    ),
                );

                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
    },
};
