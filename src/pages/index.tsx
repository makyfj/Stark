import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/ui/dialog";
import { Button } from "src/components/ui/button";
import { ssgHelper } from "src/utils/ssg";
import { api } from "src/utils/api";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import ModeToggle from "src/components/mode-toggle";
import PreviewCard from "src/components/common/preview-card";

const Home: NextPage = () => {
  const utils = api.useContext();
  const router = useRouter();
  const { data: session } = useSession();
  const user = utils.auth.getUserSession.getData();

  return (
    <>
      <Head>
        <title>Stark</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex flex-col gap-12 p-4">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-extrabold uppercase md:text-4xl">
            Stark
          </div>
          <ModeToggle />
          <Dialog>
            <DialogTrigger asChild>
              <Button>{session ? "Account" : "Get Started"}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{session ? "Account" : "Sign In"}</DialogTitle>
                <DialogDescription>
                  {session ? "Time to Get Healthy" : "Join Stark with Discord"}
                </DialogDescription>
              </DialogHeader>
              {session ? (
                <div className="flex flex-col justify-center gap-4">
                  <h3 className="self-center">Signed in as: {user?.name}</h3>
                  <Link href="/dashboard">
                    <Button className="w-full">Dashboard</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      void signOut({
                        callbackUrl: "/",
                      })
                    }
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col justify-center gap-4">
                  <Button
                    onClick={() =>
                      void signIn("discord", {
                        callbackUrl: "/dashboard",
                      })
                    }
                  >
                    Discord
                  </Button>
                  <Button
                    onClick={() =>
                      void signIn("google", {
                        callbackUrl: "/dashboard",
                      })
                    }
                  >
                    Google
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </nav>

        <Card>
          <CardHeader>
            <CardTitle>Simple, Easy, Stay Healthy, Get Strong</CardTitle>
            <CardDescription>Your Ultimate Fitness Solution</CardDescription>
          </CardHeader>
          <CardContent>
            With Stark, you can customize your workout routine based on your
            fitness level, preferences, and goals. Whether you want to lose
            weight, build muscle, or simply stay in shape, our app has a variety
            of workouts that are tailored to meet your needs. Whether you{`'`}re
            a beginner or an experienced fitness enthusiast, Stark is the
            perfect tool to help you achieve your fitness goals and live a
            healthier, happier life. Let{`'`}s get started!
          </CardContent>
          <CardFooter>
            <Button
              className="w-full font-bold"
              onClick={() => {
                if (session) {
                  void router.push("/dashboard");
                } else {
                  void signIn();
                }
              }}
            >
              {session ? "Dashboard" : "Start Now"}
            </Button>
          </CardFooter>
        </Card>
        <h2 className="custom-h2 text-center">Previews</h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <PreviewCard
            title="Dashboard Page"
            description="View your workouts and stats"
            src="/assets/dashboard-page.png"
          />
          <PreviewCard
            title="New Workout Page"
            description="Create a new workout routine and add exercises"
            src="/assets/new-workout-page.png"
          />
          <PreviewCard
            title="Workout Page"
            description="View your workout and volume progress"
            src="/assets/workout-page.png"
          />
          <PreviewCard
            title="Exercise Page"
            description="View list of exercises and add them to your workout"
            src="/assets/exercise-page.png"
          />
          <PreviewCard
            title="User Page"
            description="View your profile and edit your settings"
            src="/assets/user-page.png"
          />
          <PreviewCard
            title="User Search Page"
            description="Search for other users, view their profile and follow them"
            src="/assets/user-search-page.png"
          />
          <PreviewCard
            title="Payment Page"
            description="Subscribe to a premium plan to unlock more features"
            src="/assets/payment-page.png"
          />
          <PreviewCard
            title="Feature Request Page"
            description="Request a new feature or up vote an existing one"
            src="/assets/feature-request-page.png"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>The Core Values We Live By</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Innovation</CardTitle>
                <CardDescription>
                  We believe in constantly pushing the boundaries of what{`'`}s
                  possible and developing new and innovative ways to help our
                  users get fit and healthy.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>
                  We believe that fitness should be accessible to everyone,
                  regardless of their background or fitness level. That{`'`}s
                  why we
                  {`'`}ve designed our app to be user-friendly and customizable
                  for all.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>
                  We believe that fitness should be accessible to everyone,
                  regardless of their background or fitness level. That{`'`}s
                  why we
                  {`'`}ve designed our app to be user-friendly and customizable
                  for all.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  We believe that fitness is a journey that{`'`}s better when
                  shared. Our app fosters a sense of community and support among
                  our users, allowing them to motivate and inspire one another.
                </CardDescription>
              </CardHeader>
            </Card>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Incredible Features To Help You Stay Motivated
            </CardTitle>
          </CardHeader>
          <CardContent>
            Stark believes fitness is better shared and offers a feature to
            connect with a like-minded community. Users can search for others
            based on goals, interests, and location, follow them, see progress
            updates, offer support, and share their own updates.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need More, Premium Features With Stark Pro</CardTitle>
          </CardHeader>
          <CardContent>
            Stark{`'`}s premium membership offers effective fitness features,
            including the ability to copy and save workouts from other users or
            trainers. Additionally, members can track their progress through
            visual charts, set goals, and stay motivated throughout their
            fitness journey.
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { ssg, session } = await ssgHelper(context);

  if (session && session.user) {
    await ssg.auth.getUserSession.prefetch();

    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
    };
  } else {
    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
    };
  }
};
