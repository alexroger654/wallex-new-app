import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


interface ITextStyle {
    color?: string;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: 'normal' | 'italic';
    fontWeight?:
    'normal' | 'bold' |
    '100' | '200' | '300' | '400' | '500' |
    '600' | '700' | '800' | '900';
    letterSpacing?: number;
    lineHeight?: number;
    textAlign?:
    'auto' | 'left' | 'right' |
    'center' | 'justify';
    textDecorationLine?:
    'none' | 'underline' |
    'line-through' | 'underline line-through';
    textDecorationStyle?:
    'solid' | 'double' | 'dotted' | 'dashed';
    textDecorationColor?: string;
    textShadowColor?: string;
    textShadowOffset?: {
        width: number;
        height: number;
    };
    textShadowRadius?: number;
    textTransform?:
    'none' | 'capitalize' |
    'uppercase' | 'lowercase';
    writingDirection?:
    'auto' | 'ltr' | 'rtl';
    includeFontPadding?: boolean;
    alignSelf?:
    'auto' | 'flex-start' | 'flex-end' |
    'center' | 'baseline' | 'stretch';
    fontVariant?: Array<
        'small-caps' |
        'oldstyle-nums' | 'lining-nums' |
        'tabular-nums' | 'proportional-nums'
    >;
    shadowColor?: string;
    shadowOffset?: {
        width: number;
        height: number;
    };
    shadowOpacity?: number;
    shadowRadius?: number;
}






export default function CustomText({ text, style }: { text: string, style: ITextStyle }) {
    return (
        <Text style={[{
            fontFamily: ''
        }, style]}>{text}</Text>
    )
}

