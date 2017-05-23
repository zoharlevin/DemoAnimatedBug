
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated
} from 'react-native';
import {compose, withState, withProps, mapProps} from 'recompose';

const DemoAnimatedBug = ({scrollY, animationRange}) =>  {

      var testVal = new Animated.Value(0);      
      Animated.timing(testVal, {
        toValue: 1,
        duration: 5000
      }).start();

      const animateColor = testVal.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['rgba(255,0,0,1)', 'rgba(0,255,0,1)']                                    
                                });

      const animateTransform = {
        transform: [
            {
                translateY: animationRange.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                }),
            },
            {
                translateX: animationRange.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                }),
            },
            {
                scale: animationRange.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 3],
                }),
            },
        ],
    };
                    

    // remove "color: animateColor" OR "animateTransform" and the code will work but together there's an error
      return (<View>      
        <Animated.Text style={[{ position:'absolute',                                          
                                  color: animateColor
                              }, animateTransform]} >blah blah blah</Animated.Text>
        <Animated.ScrollView
                  scrollEventThrottle={16}                
                  onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {contentOffset: {y: scrollY}},
                        },
                    ],
                    {useNativeDriver: true}
                )}      
              >          
          <View style={styles.itemContainer}>
              <Text style={{flex: 0, height: 100, width: 100}}>Item Placeholder #1</Text>
          </View>
          <View style={styles.itemContainer}>
              <Text style={{flex: 0, height: 100, width: 100}}>Item Placeholder #2</Text>
          </View>
          <View style={styles.itemContainer}>
              <Text style={{flex: 0, height: 100, width: 100}}>Item Placeholder #3</Text>
          </View>
          <View style={styles.itemContainer}>
              <Text style={{flex: 0, height: 100, width: 100}}>Item Placeholder #4</Text>
          </View>
          <View style={styles.itemContainer}>
              <Text style={{flex: 0, height: 100, width: 100}}>Item Placeholder #5</Text>
          </View>
          <View style={styles.itemContainer}>
              <Text style={{flex: 0, height: 100, width: 100}}>Item Placeholder #6</Text>
          </View>
          <View style={styles.itemContainer}>
              <Text style={{flex: 0, height: 100, width: 100}}>Item Placeholder #7</Text>
          </View>
          <View style={styles.itemContainer}>
              <Text style={{flex: 0, height: 100, width: 100}}>Item Placeholder #8</Text>
          </View>
          <View style={styles.itemContainer}>
              <Text style={{flex: 0, height: 100, width: 100}}>Item Placeholder #9</Text>
          </View>
          <View style={styles.itemContainer}>
              <Text style={{flex: 0, height: 100, width: 100}}>Item Placeholder #10</Text>
          </View>
          <View style={styles.itemContainer}>
              <Text style={{flex: 0, height: 100, width: 100}}>Item Placeholder #11</Text>
          </View>
          <View style={styles.itemContainer}>
              <Text style={{flex: 0, height: 100, width: 100}}>Item Placeholder #12</Text>
          </View>
        </Animated.ScrollView>
      </View>)
};
    

const enhance = compose(
    withState('scrollY', 'setScrollY', () => new Animated.Value(0)),
    withProps(({scrollY}) => ({
        animationRange: scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
    }))
);

const Demo = enhance(DemoAnimatedBug);

export default Demo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  itemContainer:{
    borderColor: '#e4e4e4',
        borderWidth: 2,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 15,
        marginLeft: 15,
  }
});

AppRegistry.registerComponent('DemoAnimatedBug', () => Demo);
