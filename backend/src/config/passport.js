import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({ where: { googleId: profile.id } });

        if (!user) {
          // check if email already exists via local signup
          const existingByEmail = await prisma.user.findUnique({
            where: { email: profile.emails[0].value },
          });

          if (existingByEmail) {
            // link Google to existing local account
            user = await prisma.user.update({
              where: { id: existingByEmail.id },
              data: { googleId: profile.id },
            });
          } else {
            user = await prisma.user.create({
              data: {
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                authProvider: "google",
              },
            });
          }
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

export default passport;