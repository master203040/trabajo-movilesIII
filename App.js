

import { StyleSheet, Text, View, TextInput, Picker, Switch, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

export default function App() {
  const [rol, setRol] = useState('adm');
  const [isActive, setIsActive] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      dofb: '',
      password: '',
      salary: '',
      age: ''
    }
  })
  
  const onSubmit = data => {
    console.log(data)
    console.log(rol);
    console.log(isActive)
  }
  const toggleSwitch = () => setIsActive(previousState => !previousState);
  return (
    <View style={styles.container}>
       <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 30,
          minLength: 3,
          pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/i
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.inputs, { borderColor: errors.fullname?.type == 'required' || errors.fullname?.type == 'pattern' || errors.fullname?.type == 'maxLength' || errors.fullname?.type == 'minLength' ? 'red' : 'green' }]}
            placeholder="Nombre completo"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='fullname'
      />
      
      {errors.fullname?.type == "required" && <Text style={{ color: 'red', fontSize: 15 }}>El nombre es obligatorio</Text>}
      {errors.fullname?.type == "minLength" && <Text style={{ color: 'red', fontSize: 15 }}>El nombre debe tener mínimo 3 caracteres</Text>}
      {errors.fullname?.type == "maxLength" && <Text style={{ color: 'red', fontSize: 15 }}>El nombre debe tener máximo 30 caracteres</Text>}
      {errors.fullname?.type == "pattern" && <Text style={{ color: 'red', fontSize: 15 }}>El nombre deb tener solo letras y/o espacios</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 6,
          pattern: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="Correo Electrónico"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='email'
      />
      
      {errors.email?.type == "required" && <Text style={{ color: 'red', fontSize: 15 }}>El correo es obligatorio</Text>}
      {errors.email?.type == "minLength" && <Text style={{ color: 'red', fontSize: 15 }}>El correo debe tener mínimo 6 caracteres</Text>}
      {errors.email?.type == "pattern" && <Text style={{ color: 'red', fontSize: 15 }}>El correo no es válido</Text>}

      <Controller
        control={control}
        rules={{
          pattern: /^([012][1-9]|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="Fecha de nacimiento: dd/mm/aaaa"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='dofb'
      />
      
      {errors.dofb?.type == "pattern" && <Text style={{ color: 'red', fontSize: 15 }}>La fecha deber con formato dd/mm/aaaa</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&])\S{8,15}$/

        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChange={onChange}
            onBlur={onBlur}
            value={value}

          />
        )}
        name='password'
      />
      
      {errors.password?.type == "required" && <Text style={{ color: 'red', fontSize: 15 }}>La contraseña es obligatoria</Text>}
      {errors.password?.type == "pattern" && <Text style={{ color: 'red', fontSize: 15 }}>Debe tener entre 8 chars  </Text>}

      <Controller
        control={control}
        rules={{
          pattern: /^[0-9]+$/

        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="Salario"
            onChange={onChange}
            onBlur={onBlur}
            value={value}

          />
        )}
        name='salary'
      />
      
      {errors.salary?.type == "pattern" && <Text style={{ color: 'red', fontSize: 15 }}>Solo numeros</Text>}

      <Picker
        selectedValue={rol}
        style={{ height: 30, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setRol(itemValue)}
      >
        <Picker.Item label="Administrador" value="adm" />
        <Picker.Item label="Usuario Final" value="user" />
      </Picker>
      <View style={{flexDirection:'row'}}>
        <Text>Está activo?</Text>
        <Switch
          trackColor={{ false: "gray", true: "green" }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isActive}
        />
      </View>
      <TouchableOpacity
        style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, marginTop: 10, width: 100 }}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Enviar</Text>
      </TouchableOpacity>
    </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5
  }
});


