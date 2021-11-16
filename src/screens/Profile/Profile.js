

import React, { useEffect, useState } from 'react'

import {Image, RefreshControl, StyleSheet, Text,View} from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { catchClause } from '@babel/types'

import {
    FlatList
} from 'react-native-gesture-handler'
import VideoPreviewCard from '../../components/VideoPreviewCard'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileDetails, getProfileVideos, logOut } from '../../redux/Actions/ProfileActions'
import RoundImage from '../../components/RoundImage'




import {
    
} from 
'react-native-elements'
import { Colors } from '../../constants/colors'

const Profile=({navigation})=>
{

    const dispatch=useDispatch()
    let userDetails=useSelector(state=>state.Profile.userProfile)

    //onsole.log(userDetails)
    const [selected,setselected]=useState([])

    
    const videos=useSelector(
            state=>state.Profile.UserVideos
    )

    //onsole.log(videos,'videos')
   const UserVideosLoad=useSelector(
       state=>state.Profile.UserVideosLoad
   )


   const logout=async()=>
   {
       dispatch(logOut())
        auth().signOut()
       navigation.navigate('Login')
   }

   const isPartOflist=(id)=>
   {


    console.log(selected)
     const found=selected.includes(id)

   
     return found
   }
    


   const [refreashProfile,setRefreashProfile]=useState(false)
 
   useEffect
   (
       ()=>
       {

        console.log(selected)
       },
       [selected]
   )
   

    const renderItem=({item,index})=>
    {

       let found= isPartOflist(item.id)
        return(
            <TouchableOpacity
            
            
            style={
                {
                    opacity:found?0.1:1
                }
            }
            onLongPress={
                ()=>setselected(...selected,item.id)
            }
            onPress={
                ()=>navigation.navigate(
                    "UserVideoPlayer",
                    {
                        id:item.id,
                        index:index
                    }
                )
            }
            
            >
              <VideoPreviewCard
              data={
                  item
              }
              >

              </VideoPreviewCard>

            </TouchableOpacity>
        )

    }


    const getVideosList=()=>
    {
        dispatch(getProfileVideos())

    }

    useEffect
    (
        ()=>
        {

          dispatch(getProfileDetails())
         
          getVideosList()
        },
        []
    )

    

    

    return(


        <View
        style={{flex:1
        ,
        backgroundColor:'black'
        }}
        >   
            <View
            style={{
                height:'40%',
                margin:10,
                backgroundColor:'transparent',
              
            }}
                
            >
                <ScrollView
                
                refreshControl={
                    <RefreshControl
                    
                    refreshing={refreashProfile}
                    onRefresh={()=>getProfileDetails()}
                    ></RefreshControl>
                }
                >

                <RoundImage
                imageURL={auth().currentUser.photoURL}
                />
          
            
               
                <Text
                style={{
                    color:'#fff',
                    fontSize:20,
                    alignSelf:'center'
                }}
                >
               
                {auth().currentUser.displayName}
                </Text>
                <View
                style={{
                    height:50,
                    flexDirection:"row",
                    justifyContent:'space-around',
                    marginVertical:10
                }}
                >
                    <View style={styles.profileDetailsContainer}>
                        <Text
                        style={{
                            color:"#fff"
                        }}
                        >
                            Follwing
                        </Text>
                        <Text style={styles.text}>
                            {userDetails.Follwing}
                        </Text>
                    </View>
                    <View style={styles.profileDetailsContainer}>
                        <Text
                        style={{
                            color:"#fff"
                        }}
                        >
                            Follwers
                        </Text>
                        <Text style={styles.text}>
                            {userDetails.Follwers}
                        </Text>
                    </View>
                    <View style={styles.profileDetailsContainer}>
                        <Text
                        style={{
                            color:"#fff"
                        }}
                        >
                            Likes
                        </Text>
                        <Text style={styles.text}>
                            {userDetails.Likes}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                onPress={()=>navigation.navigate('Edit')}
                style={{
                    alignSelf:'center',
                    alignItems:'center',
                    backgroundColor:'#fff',
                    padding:10,
                    borderRadius:10
                }}
                >
                    <Text style={[styles.text,{color:'black'}]}>EDIT PROFILE</Text>
                </TouchableOpacity>
                <TouchableOpacity
               onPress={()=>logout()}
                style={{
                    alignSelf:'center',
                    alignItems:'center',
                    backgroundColor:'red',
                   
                    padding:10,
                    borderRadius:10
                }}
                >
                    <Text style={[styles.text,{color:Colors.White}]}>
                        LogOut</Text>
                </TouchableOpacity>
            </ScrollView>
            </View>
           
           <View
           style={
               {
                height:'70%'
               }
           }
           >
            <FlatList
        style={
            {
                margin:10,
               
            }
        }


        refreshControl={
            <RefreshControl
            refreshing={UserVideosLoad}
            onRefresh={
                ()=>getVideosList()
            }
            
            ></RefreshControl>
        }

        data={videos}

        showsVerticalScrollIndicator={true}
    
       // zoomScale={5}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={item=>item.id}

        >

        </FlatList>
        </View>
        
        </View>
    )
}


const styles=StyleSheet.create
(
    {


        profileDetailsContainer:
        {
            alignItems:'center',
            paddingHorizontal:10,
            borderRightWidth:0.7,
            borderLeftColor:'#fff',
            borderLeftWidth:0.7,
            borderRightColor:"#fff"
        },
        text:{
            color:'#fff',
            fontSize:18,
            
            
        }
    }
)
export default Profile