import React from 'react'
import RecipeListItem from './RecipeListItem'
import { useRecipesContext } from '../context/recipes-context'
import { Dimensions, FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native'

const { width, height } = Dimensions.get("window");

export const RecipeList = () => {
    const { recipes, pageState, fetchRecipes, handleLoadMore } = useRecipesContext()

    React.useEffect(() => {
        fetchRecipes()
    }, [])

    renderFooter = () => {
        if (!pageState.loadingMore) return null;
    
        return (
          <View
            style={{
              position: 'relative',
              paddingVertical: 20,
              borderTopWidth: 1,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <ActivityIndicator animating />
          </View>
        );
      };

    if ((!recipes || !recipes.length) && pageState.loading === false) {
        return <Text style={styles.message}>No recipes</Text>
    }

    return (
        !pageState.loading ? (
            <FlatList 
                data={[... new Set(recipes)]}
                renderItem={({ item }) => <RecipeListItem recipe={item} />}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={styles.container}
                onEndReached={pageState.hasMoreToLoad ? handleLoadMore : null}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                // onRefresh={handleRefresh}
                // refreshing={pageState.refreshing}
                // initialNumToRender={6}

            />
        ) : (
            <View>
                <ActivityIndicator />
            </View>
        )
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: width > 400 ? 40 : 30,
    },
    message: {
      alignSelf: 'center',
    }
})

export default RecipeList