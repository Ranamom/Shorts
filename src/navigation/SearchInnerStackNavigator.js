
import React from 'react'
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import Search from '../screens/Search/Search'


const SearchInnerStackNavigator = () => {

    const SearchStack = createStackNavigator()

    return (

            <SearchStack.Navigator
              

                initialRouteName="SearchScreen"
            >

            <SearchStack.Screen
            name="SearchScreen"
            options={
                {
                    headerShown:false
                }
            }
            component={Search}
            ></SearchStack.Screen>
{/*          
         <SearchStack.Screen
            name="userDetails"
            options={
                {
                    headerShown:false
                }
            }
            component={userDetails}
            ></SearchStack.Screen>


<SearchStack.Screen
            name="UserVideoPlayer"
            options={
                {
                    headerShown:false
                }
            }
            component={UserVideoPlayer}
            ></SearchStack.Screen>
           */}
          </SearchStack.Navigator> 
    )
      
      

}

const styles = StyleSheet.create
    (
        {
            Container:
            {
                flex: 1
            }

        }
    )
export default SearchInnerStackNavigator