
// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// export default function HomeScreen() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         {/* Custom Header */}
//         <View style={styles.header}>
//           <FontAwesome5 name="music" size={28} color="#EF3E46" />
//           <Text style={styles.headerText}>The Salvation Army Songbook</Text>
//         </View>

//         {/* Main Content */}
//         <View style={styles.main}>
//           <Text style={styles.title}>
//             Welcome to the {"\n"} Songbook App
//           </Text>
//           <Text style={styles.subtitle}>
//             Choose your language to begin{" "} <br />
//             Sarudza mutauro kuti utange{" "} <br />
//             Khetha ulimi ukuze uqale{" "} 
//             <FontAwesome5 name="music" size={14} color="#EF3E46" />
//           </Text>

//           {/* Buttons */}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => router.push("/shona")}
//           >
//             <Image
//               source={{
//                 uri: "https://storage.googleapis.com/a1aa/image/93cbff72-7d48-48bb-373a-7b0095bb381b.jpg",
//               }}
//               style={styles.flag}
//             />
//             <Text style={styles.buttonText}>Shona</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => router.push("/ndebele")}
//           >
//             <Image
//               source={{
//                 uri: "https://storage.googleapis.com/a1aa/image/6b889e4c-963f-4516-4d71-d584df48f712.jpg",
//               }}
//               style={styles.flag}
//             />
//             <Text style={styles.buttonText}>Ndebele</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => router.push("/english")}
//           >
//             <Image
//               source={{
//                 uri: "https://storage.googleapis.com/a1aa/image/f43a9668-b194-444a-f715-8388dcb36e32.jpg",
//               }}
//               style={styles.flag}
//             />
//             <Text style={styles.buttonText}>English</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => router.push("/liked")}
//           >
//             <FontAwesome5 name="heart" size={20} color="white" />
//             <Text style={styles.buttonText}>Favorites</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }






// const styles = StyleSheet.create({


//   container: {
//     flex: 1,
//     backgroundColor: "#002056",
//     padding: 0,
//   },
//   card: {
//     backgroundColor: "#002056",
//     borderRadius: 40,
//     width: "100%",
//     maxWidth: 400,
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   header: {
//     backgroundColor: "#132230",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//   },
//   headerText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   main: {
//     paddingHorizontal: 24,
//     paddingVertical: 45,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "800",
//     color: "#fff",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#fff",
//     marginBottom: 50,
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "#EF3E46",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 14,
//     borderRadius: 14,
//     width: "100%",
//     marginBottom: 28,
//     gap: 12,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 20,
//     fontWeight: "600",
//   },
//   flag: {
//     width: 32,
//     height: 24,
//     borderRadius: 4,
//     resizeMode: "cover",
//   },
// });




import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";

export default function LanguageScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")} // <-- your background image path
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Choose your language</Text>


          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/shona")}
          >
            <Text style={styles.buttonText}>Shona</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/ndebele")}
          >
            <Text style={styles.buttonText}>Ndebele</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/english")}
          >
            <Text style={styles.buttonText}>English</Text>
          </TouchableOpacity>


        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    // Position image bottom-right
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },

  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 46,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    color: "#8400ffff",
    marginBottom: 50,
  },
  button: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
