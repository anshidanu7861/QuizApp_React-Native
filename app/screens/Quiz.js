import React, { useState } from 'react'
import { Animated, Image, Modal, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, SIZES } from '../constant/theme'
import data from '../data/QuizData'
import MeterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function Quiz() {

    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null)
    const [correctOption, setCorrectOption] = useState(null)
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false)
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)

    const validateAnswer = (selectedOptions)=> {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option']
        setCurrentOptionSelected(selectedOptions)
        setCorrectOption(correct_option)
        setIsOptionsDisabled(true)

        if(selectedOptions === correct_option){
            setScore(score+1)
        }

        setShowNextButton(true)
    }

    const renderQuestion= ()=>{
      return(
        <View style={{
            marginVertical: 40
        }}>
        <View style={{
            flexDirection: 'row',
            alignItems:'flex-end'
        }}>
            <Text style={{color:COLORS.white, fontSize: 20, opacity:0.6, marginRight:2}}>{currentQuestionIndex + 1}</Text>
            <Text style={{color:COLORS.white, fontSize: 18, opacity:0.6}} >/{allQuestions.length}</Text>  
        </View>
        <View>
            <Text style={{color:COLORS.white, fontSize:30}}>{allQuestions[currentQuestionIndex]?.question}</Text>
        </View>
    </View>
      )
    }

    const renderOptions = () =>{
        return(
            <View>
                {
                    allQuestions[currentQuestionIndex]?.options.map(option=>(
                        <TouchableOpacity
                        onPress={()=>validateAnswer(option)}
                        disabled={isOptionsDisabled}
                        key={option}
                        style={{
                            borderWidth:3, borderColor: option===correctOption
                            ? COLORS.success 
                            : option===currentOptionSelected
                            ? COLORS.error
                            : COLORS.secondary+'40',
                            backgroundColor: option===correctOption
                            ? COLORS.success+'20'
                            : option===currentOptionSelected
                            ? COLORS.error+'20'
                            : COLORS.secondary+'20',
                            height: 60, borderRadius: 20,
                            flexDirection: 'row',
                            alignItems:'center', justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginVertical: 10
                        }}
                        >
                            <Text style={{fontSize: 20, color:COLORS.white}}>{option}</Text>

                            {
                                option === correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2, 
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center'
                                    }} >
                                        <MeterialCommunityIcons name='check' style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ) : option === currentOptionSelected ?  (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2, 
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MeterialCommunityIcons name='close' style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ) : null
                            }


                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    const handleNext = () =>{
        if(currentQuestionIndex === allQuestions.length-1){
            //Last Question

            //Show Score Modal
            setShowScoreModal(true)
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1)
            setCurrentOptionSelected(null)
            setCorrectOption(null)
            setIsOptionsDisabled(false)
            setShowNextButton(false)
            Animated.timing(progress, {
                toValue: currentQuestionIndex+1, 
                duration: 1000,
                useNativeDriver: false 
            }).start()
        }

      
    }

    const renderNextButton = () =>{
        if(showNextButton) {
            return(
                <TouchableOpacity 
                onPress={handleNext}
                style={{
                    marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius:5
                }}>
                    <Text style={{fontSize: 20, color: COLORS.white, textAlign: 'center'}}>Next</Text>
                </TouchableOpacity>
            )
        }else {
            return null
        }
    }

    const restartQuiz = () => {
        setShowScoreModal(false)

        setCurrentQuestionIndex(0)
        setScore(0)

        setCurrentOptionSelected(null)
        setCorrectOption(null)
        setIsOptionsDisabled(false)
        setShowNextButton(false)
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false 
        }).start()
    }

    const [progress, setProgress] = useState(new Animated.Value(0))
  
    const renderProgressBar = () => {
        return(
            <View style={{
                width: '100%', 
                height: 20,
                borderRadius: 20, 
                backgroundColor:'#00000020'
            }}>
              
            </View>
        )
    }

  return (
   <SafeAreaView style={{
    flex: 1
   }}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary}/>
        <View style={{
            flex: 1,
            paddingVertical: 40,
            paddingHorizontal: 16,
            backgroundColor: COLORS.background,
            position: "relative"
        }} >

            {/* Progress Bar */}
            {renderProgressBar()}

            {/* Question */}
            {renderQuestion()}

            {/* RenderOptions */}
            {renderOptions()}

            {/* NextButton */}
            {renderNextButton()}

            {/* Score Modal */}
            <Modal 
            animationType='slide'
            transparent={true}
            visible={showScoreModal}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        width: '90%',
                        borderRadius: 20,
                        padding: 20,
                        alignItems: 'center'
                    }}>
                        <Text style={{fontSize: 30, fontWeight: 'bold'}}>{score > (allQuestions.length/2) ? 'Congratulations!' : 'Oops!!'}</Text>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginVertical: 20
                        }}>
                            <Text style={{
                                fontSize: 30,
                                color: score> (allQuestions.length/2) ? COLORS.success : COLORS.error
                            }}>{score}</Text>
                            <Text style={{
                                fontSize: 20, color: COLORS.black
                            }}>/ {allQuestions.length}</Text>
                        </View>

                            {/* Retry Quiz Button */}
                            <TouchableOpacity 
                            onPress={restartQuiz}
                            style={{
                                backgroundColor: COLORS.accent,
                                padding: 20, width: '100%', borderRadius: 20
                            }}>
                                <Text style={{
                                    textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Retry Quiz</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
   </SafeAreaView>
  )
}

export default Quiz
