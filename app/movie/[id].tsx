import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {router, useLocalSearchParams} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovieDetails} from "@/services/api";
import {icons} from "@/constants/icons";

interface MovieInfoProps {
    label: string;
    value?: string | number |null;
}
const MovieInfo = ({label, value}:MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">
            {label}
        </Text>

        <Text className="text-light-100 font-bold text-sm mt-2">
            {value || 'N/A'}
        </Text>
    </View>
)

const Details = () => {
    const {id} = useLocalSearchParams();
    const {data:movie, loading} = useFetch(()=> fetchMovieDetails(id as string))

    return (
        <View className="bg-primary flex-1">
            <ScrollView contentContainerStyle={{
                paddingBottom:80
            }}>
                <View>
                    <Image source={{uri:`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}
                    className="w-full h-[550px]" resizeMode="stretch"/>
                </View>

                <View className="flex-col items-start justify-center mt-5 px-5">
                    <Text className="text-white text-xl font-bold">{movie?.title}</Text>
                    <View className="flex-row items-center gap-x-1 mt-2">
                        <Text className="text-light-200 text-sm">{movie?.release_date.split('-')[0]}</Text>
                        <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
                    </View>

                    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                        <Image source={icons.star} className="size-4" />
                        <Text className="text-white text-sm font-bold">
                            {Math.round(movie?.vote_average ?? 0)}/10
                        </Text>

                        <Text className="text-light-200 text-sm">
                            ({movie?.vote_count} votess)
                        </Text>
                    </View>
                    <MovieInfo label="요약" value={movie?.overview} />
                    <MovieInfo label="장르" value={movie?.genres.map((g)=>g.name).join(' - ') || 'N/A'} />

                    <View className="flex-row justify-between w-1/2">
                        <MovieInfo label="예산" value={`$${movie?.budget / 1_000_000} million`} />
                        <MovieInfo label="수익" value={`${Math.round(movie?.revenue) / 1_000_000}`} />
                    </View>

                    <MovieInfo label="제작사" value={movie?.production_companies.map((c)=> c.name).join(' - ') || 'N/A'} />
                </View>

            </ScrollView>
            <TouchableOpacity
                className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                onPress={router.back}
            >
                <Image
                    source={icons.arrow}
                    className="size-5 mr-1 mt-0.5 rotate-180"
                    tintColor="#fff"
                />
                <Text className="text-white font-semibold text-base">Go Back</Text>
            </TouchableOpacity>

        </View>
    )
}
export default Details