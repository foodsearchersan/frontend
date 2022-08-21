import { View, Text , ScrollView} from 'react-native'
import React from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurentCard from '../components/RestaurentCard'
import { useEffect, useState } from 'react';
import sanityClient from '../sanity'

const FeaturedRow = ({title, description, id}) => {
  const [restaurants, setRestaurants] = useState()

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured" && _id == $id] {
      ...,
      restaurants[] -> {
        ...,
        dishes[] -> ,
        type -> {
          name
        }
      }
    }[0]
    `,
        { id }
      )
      .then(data => setRestaurants(data?.restaurants))
  }, [id])
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="blue"/>
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
      horizontal
      className="pt-4"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      >
        {/* Cards for Each Section */}
        {restaurants?.map(restaurant => (
          <RestaurentCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
        
      </ScrollView>
    </View>
  )
}

export default FeaturedRow