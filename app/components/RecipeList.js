import React, { useEffect, useState, useRef } from 'react'
import RecipeListItem from './RecipeListItem'
import { useFiltersContext } from '../context/filters-context'
import { config } from '../config/config'
import selectRecipes from '../selectors/recipes'
import { useRecipesContext } from '../context/recipes-context'
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import useAllRecipes from '../hooks/useAllRecipes'
import { getRecipesService } from '../services/recipeServices'
import usePrevious from '../hooks/usePrevious'


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
    // const startIndex = (pageState.activePage * config.itemsPerPage) - config.itemsPerPage
    // const endIndex = startIndex + config.itemsPerPage
    // const selectedRecipes = selectRecipes(recipes, filters)
    // const paginatedItems = selectedRecipes && selectedRecipes.slice(startIndex, endIndex)

    // console.log('selectedrecipes', selectedRecipes)

    React.useEffect(() => {
        fetchRecipes()
    }, [pageState.page])

    fetchRecipes = async () => {
        // if (isCurrent.current) {
            const fetchedRecipes = await getRecipesService(pageState.page, itemsPerPage)
            // console.log(fetchedRecipes.map(recipe => recipe.url))
            if (fetchedRecipes) {
                recipeDispatch({
                    type: 'SET_RECIPES',
                    recipes: pageState.page === 1
                        ? fetchedRecipes
                        : [...recipes, ...fetchedRecipes]
                })
                // .then((res) => {
                    setPageState((prevState, nextProps) => ({
                        ...pageState,
                        loading: false,
                        loadingMore: false,
                        refreshing: false,
                        hasMoreToLoad: fetchedRecipes.length < itemsPerPage ? false : true
                    }))
                // }).catch(error => {
                //     setPageState({ ...pageState, error, loading: false})
                // })
            } 
            // else {
            //     setPageState(() => ({
            //         ...pageState,
            //         isListEnd: true
            //     }))
            // }
        // }
    }

    handleRefresh = () => {
        // console.log('handle refresh')
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
      //  console.log('load more')
       setPageState((prevState) => ({
            // ...pageState,
            page: prevPage + 1,
            loadingMore: true
        }))
        // () => {
        //     fetchRecipes()
        // }
    }

    renderFooter = () => {
        if (!pageState.loadingMore) return null;
    
        return (
          <View
            style={{
              position: 'relative',
            //   width: width,
            //   height: height,
              paddingVertical: 20,
              borderTopWidth: 1,
              marginTop: 10,
              marginBottom: 10,
            //   borderColor: colors.veryLightPink
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
                contentContainerStyle={styles.containter}
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
    containter: {
        // justifyContent: 'center',
        // alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
        // flex: 1,
        // flexGrow: 0,
        // minHeight: 100,
    },
    message: {
      alignSelf: 'center',
    }
})

export default RecipeList