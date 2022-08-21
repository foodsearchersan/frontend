import { View, Text, Image, SafeAreaView  ,TextInput , ScrollView } from 'react-native';
import React, { useLayoutEffect , useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    UserIcon,
    ChevronDownIcon,
    SearchIcon,
    AdjustmentsIcon,
    PresentationChartBarIcon,
    VideoCameraIcon,
    FilterIcon
  } from 'react-native-heroicons/outline'
import SafeViewAndroid from "../utils/SafeViewAndroid";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from '../sanity';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([])
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        })
    },[])
    useEffect(() => {
      sanityClient
        .fetch(
          `
            *[_type == "featured"] {
              name,
              short_description,
            _id,
            }
      `
        )
        .then(data => setFeaturedCategories(data))
    }, [])
    return (
        // Home Screen Design 
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        {/* Header Component */}
        <View className="flex-row p-3 items-center mx-4 space-x-2">
          <Image
            source={{ uri: 'data:image/png;base64,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' }}
            className="h-7 w-7 bg-gray-300 rounded-full"
          />
          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">Good Evening,  Achuth </Text>
            <Text className="font-bold text-xl">
              Current Location
              <ChevronDownIcon size={20} color="blue" />
            </Text>
          </View>
          <VideoCameraIcon size={25} color="blue" />
        </View>
  
        {/* Search Component will be here */}
        <View className="flex-row items-center space-x-2 mx-4 pb-2">
          <View className="flex-row spzce-x-2 flex-1 bg-gray-200 p-3 items-center">
            <SearchIcon color="gray" size={20} />
            <TextInput
              placeholder="Restaurants and Dishes"
              keyboardType="default"
              className="ml-1"
            />
          </View>
          <FilterIcon color="blue" />
        </View>
        {/* Search Component end */}

        {/* Body of Home Screen Starts*/}
        <ScrollView className="bg-gray-100" contentContainerStyle={{ paddingBottom:100, }}>
            {/* Categories Part */}
            <Categories />
            {/* Featured Part */}
            {featuredCategories?.map(category => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
        </ScrollView>
        {/* Ending */}
  
        
      </SafeAreaView>
    );
};

export default HomeScreen;