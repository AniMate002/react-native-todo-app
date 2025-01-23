import { View, Platform } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps} from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons';
import { create } from 'zustand';

export function TabBar({ state, descriptors, navigation } : BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const icon: any = {
    index: (props: any) => <Feather name='home' size={24} color={props.focused ? "#36374B" : "#7E868F"} />,
    create: (props: any) => <Feather name='plus' size={24} color={props.focused ? "#36374B" : "#7E868F"} />,
    profile: (props: any) => <Feather name='user' size={24} color={props.focused ? "#36374B" : "#7E868F"} />,
  }

  return (
    <View className='absolute bottom-[50] w-full flex flex-row items-center justify-center'>
        <View 
        style={{shadowColor: "#000", shadowOffset: {width: 0, height:10}, shadowRadius: 10, shadowOpacity: 0.1}}  
        className='flex-row bg-white text-center justify-between items-center py-[15] rounded-[35] w-1/2'>
        {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
            options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
            }
            };

            const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
            };

            return (
            <PlatformPressable
                key={route.key}
                href={buildHref(route.name, route.params)}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                className={`flex-1 flex-col items-center justify-center`}
            >
                <View className={`flex-col items-center justify-center ${isFocused ? "bg-[#f7f7f7] rounded-full" : ""} rounded-full w-[50] h-[50]`}>
                    {icon[route.name]({ focused: isFocused })}
                </View>
            </PlatformPressable>
            );
        })}
        </View>
    </View>
  );
}