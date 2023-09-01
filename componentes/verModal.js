import React from 'react';
import { ScrollView, StyleSheet, Text, View ,Modal,TouchableOpacity,Alert} from 'react-native';

export default function VerModal({visible,close}){



    return(
        <Modal 
        visible={visible} 
        onRequestClose={close}
        animationType="slide"
         transparent={true}
        
        
        >
           <View style={{backgroundColor:'rgba(0,0,0,0.7)',height:'100%'}}>
                    <View 
                        style={{
                            height:'30%',
                            margin:10,
                            borderRadius:10,
                            borderWidth:1,
                            backgroundColor:'white',
                            marginTop:'60%',
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                        >
                                <TouchableOpacity style={{borderRadius:10,borderWidth:1}} onPress={()=>close()}>
                                    <Text>cerrar</Text>
                                </TouchableOpacity>
                            <Text>SOY UN MODAL</Text>
                        </View>
           </View>
            

        </Modal>
    )
}


