"use client"
import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const containerVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
}
const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const FeaturesSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariant}
      className="py-24 px-6 sm:px-8 lg:px-12 xl:px-16 bg-white"
    >
      <div className="max-w-4xl xl:max-w-6xl mx-auto">
        <motion.h2
          variants={itemVariant}
          className="text-3xl font-bold text-center mb-16 w-full sm:w-2/3 mx-auto"
        >
          Quickly find the home you want using out effective search filters!
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          {[0, 1, 2].map((index) => (
            <motion.div key={index} variants={itemVariant}>
              <FeatureCard
                imageSrc={`/landing-search${3 - index}.png`}
                title={
                  [
                    "Trustworthy and Verified Listing",
                    "Brows Rental Listing with Ease",
                    "Simplify Your Search with Advanced",
                  ][index]
                }
                description={
                  [
                    "Discover the best rental options with user reviews and ratings.",
                    "Get access to user reviews and ratings for a better understanding of rental options.",
                    "Find trustworthy and verified rental listing to ensure a hassle-free experience.",
                  ][index]
                }
                linkText={["Explore", "Search", "Discover"][index]}
                linkHref={["/explore", "/search", "/discover"][index]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const FeatureCard = ({
  imageSrc,
  title,
  description,
  linkText,
  linkHref,
}: {
  imageSrc: string
  title: string
  description: string
  linkText: string
  linkHref: string
}) => (
  <div className="text-center">
    <div className="p-4 mb-4 rounded-lg flex flex-col items-center justify-center h-50">
      <Image
        src={imageSrc}
        width={400}
        height={400}
        className="w-full h-full object-contain"
        alt={title}
      />
      <h3 className="text-xl font-semibold m-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <Link
        href={linkHref}
        className="inline-block border border-gray-300 px-4 py-2 hover:bg-gray-100"
        scroll={false}
      >
        {linkText}
      </Link>
    </div>
  </div>
)

export default FeaturesSection
