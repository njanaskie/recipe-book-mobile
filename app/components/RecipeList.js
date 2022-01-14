import React, { useEffect, useState, useRef } from 'react'
import RecipeListItem from './RecipeListItem'
import { useFiltersContext } from '../context/filters-context'
import { config } from '../config/config'
import selectRecipes from '../selectors/recipes'
import { useRecipesContext } from '../context/recipes-context'
import { Dimensions, FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { getRecipesService } from '../services/recipeServices'
import usePrevious from '../hooks/usePrevious'
import BannerAd from '../components/BannerAd'

const { width, height } = Dimensions.get("window");

export const RecipeList = () => {
    const initialFormState = {
        isListEnd: false,
        page: 1,
        loading: true,
        loadingMore: false,
        refreshing: false,
        hasMoreToLoad: true,
        error: null
    }
    const [pageState, setPageState] = useState(initialFormState)
    const { filters } = useFiltersContext()
    const { recipes, recipeDispatch } = useRecipesContext()
    const selectedRecipes = selectRecipes(recipes, filters)
    const prevPage = usePrevious(pageState.page)
    const itemsPerPage = config.itemsPerPage

    React.useEffect(() => {
        fetchRecipes()
    }, [pageState.page])

    fetchRecipes = async () => {
            const fetchedRecipes = await getRecipesService(pageState.page, itemsPerPage)
            if (fetchedRecipes) {
                recipeDispatch({
                    type: 'SET_RECIPES',
                    recipes: pageState.page === 1
                        ? fetchedRecipes
                        : [...recipes, ...fetchedRecipes]
                })
                    setPageState((prevState, nextProps) => ({
                        ...pageState,
                        loading: false,
                        loadingMore: false,
                        refreshing: false,
                        hasMoreToLoad: fetchedRecipes.length < itemsPerPage ? false : true
                    }))
            } 
    }

    handleRefresh = () => {
        setPageState(
          {
            page: 1,
            refreshing: true
          },
          () => {
            fetchRecipes();
          }
        );
      };

    handleLoadMore = () => {
       setPageState((prevState) => ({
            page: prevPage + 1,
            loadingMore: true
        }))
    }

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
            <ActivityIndicator animating size="large" />
          </View>
        );
      };

    if (!selectedRecipes || !selectedRecipes.length) {
        return <Text style={styles.message}>No recipes</Text>
    }
    
    return (
        !pageState.loading ? (
            <FlatList 
                data={[... new Set(selectedRecipes)]}
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
                <Text>Loading recipes</Text>
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