import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { Prisma } from "@prisma/client";

const workoutsByUserId = Prisma.validator<Prisma.WorkoutSelect>()({
  id: true,
  name: true,
  copyCount: true,
  exercises: {
    take: 2,
    select: {
      name: true,
    },
  },
  createdAt: true,
});

export const usersBySearchName = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  image: true,
});

export const userRouter = createTRPCRouter({
  getUserById: protectedProcedure
    .input(z.object({ id: z.string().nullable() }))
    .query(async ({ ctx, input }) => {
      if (input.id) {
        return ctx.prisma.user.findUnique({
          where: {
            id: input.id,
          },
        });
      }

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No user id provided",
      });
    }),

  getWorkoutsByUserId: protectedProcedure
    .input(z.object({ userId: z.string().nullable() }))
    .query(async ({ ctx, input }) => {
      if (input.userId) {
        const userWorkouts = await ctx.prisma.workout.findMany({
          take: 4,
          orderBy: {
            createdAt: "desc",
          },
          where: {
            userId: input.userId,
          },
          select: workoutsByUserId,
        });

        if (userWorkouts.length > 0) {
          return userWorkouts;
        }

        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No workouts found",
        });
      }

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No user id provided",
      });
    }),

  getUsersBySearchName: protectedProcedure
    .input(
      z.object({
        name: z.string().nullable(),
        userId: z.string().nullable().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.name && input.userId) {
        const users = await ctx.prisma.user.findMany({
          where: {
            name: {
              search: input.name,
            },
            NOT: {
              id: input.userId,
            },
          },
          take: 4,
          select: usersBySearchName,
        });

        if (users.length > 0) {
          return users;
        }

        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No users found",
        });
      }

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No name provided",
      });
    }),

  getUserFollowers: protectedProcedure
    .input(z.object({ userId: z.string().nullable() }))
    .query(async ({ ctx, input }) => {
      if (input.userId) {
        const followers = await ctx.prisma.user.findMany({
          where: {
            followers: {
              some: {
                followingId: input.userId,
              },
            },
          },
          select: usersBySearchName,
        });

        if (followers.length > 0) {
          return followers;
        } else {
          return [];
        }

        // throw new TRPCError({
        //   code: "BAD_REQUEST",
        //   message: "No followers found",
        // });
      }

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No user id provided",
      });
    }),

  getUserFollowing: protectedProcedure
    .input(z.object({ userId: z.string().nullable() }))
    .query(async ({ ctx, input }) => {
      if (input.userId) {
        const following = await ctx.prisma.user.findMany({
          where: {
            following: {
              some: {
                followerId: input.userId,
              },
            },
          },
          select: usersBySearchName,
        });

        if (following.length > 0) {
          return following;
        }

        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No following found",
        });
      }

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No user id provided",
      });
    }),
});
