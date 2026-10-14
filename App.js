import { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet } from 'react-native';

// Lista de operaciones: cada una tendrá su propio Switch
const OPERACIONES = [
  { id: 'suma', titulo: 'Sumar', calcular: (a, b) => a + b },
  { id: 'resta', titulo: 'Restar', calcular: (a, b) => a - b },
  { id: 'multiplicacion', titulo: 'Multiplicar', calcular: (a, b) => a * b },
  {
    id: 'division',
    titulo: 'Dividir',
    calcular: (a, b) => (b === 0 ? 'No se puede dividir entre 0' : a / b),
  },
];

export default function App() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  // Guarda cuál operación está activa (null = ninguna)
  const [activa, setActiva] = useState(null);

  const num1 = parseFloat(number1);
  const num2 = parseFloat(number2);
  const numerosValidos = !isNaN(num1) && !isNaN(num2);

  // Evento onValueChange: se ejecuta cada vez que se mueve un Switch
  const handleToggle = (id, encendido) => {
    if (encendido) {
      if (!numerosValidos) {
        alert('Por favor ingresa números válidos');
        return; // el Switch se queda apagado
      }
      setActiva(id); // al encender uno, los demás se apagan
    } else {
      setActiva(null);
    }
  };

  // El resultado se calcula a partir del estado
  const operacionActiva = OPERACIONES.find((op) => op.id === activa);
  let resultado = null;
  if (operacionActiva) {
    resultado = numerosValidos
      ? operacionActiva.calcular(num1, num2)
      : 'Ingresa números válidos';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingresa el primer número:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={number1}
        onChangeText={setNumber1}
      />

      <Text style={styles.label}>Ingresa el segundo número:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={number2}
        onChangeText={setNumber2}
      />

      {OPERACIONES.map((op) => (
        <View key={op.id} style={styles.fila}>
          <Text style={styles.textoFila}>{op.titulo}</Text>
          <Switch
            value={activa === op.id}
            onValueChange={(valor) => handleToggle(op.id, valor)}
          />
        </View>
      ))}

      {resultado !== null && (
        <Text style={styles.result}>
          {operacionActiva.titulo}: {resultado}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    marginBottom: 8,
  },
  textoFila: {
    fontSize: 18,
  },
  result: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
