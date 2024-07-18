import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';

export default function SongItem() {
  return (
    <Pressable>
      <Image source={{ uri: 'https://www.google.com/url?q=https://bilimgenc.tubitak.gov.tr/makale/bir-balik-ne-kadar-hizli-yuzebilir&sa=U&ved=2ahUKEwjz183O5qqHAxVvRaQEHS1UDN0QqoUBegQIERAB&usg=AOvVaw3P8JyMBlrVubWRCrj5WXfX' }} style={{ width: 50, height: 50 }} />
    </Pressable>
  );
}
