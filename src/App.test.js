import { shallow } from 'enzyme';
import { generarYDescargarPDF } from './nombre-del-archivo-donde-se-encuentra-la-funcion';
import App from './App';

describe('App', () => {
  it('debería llamar a generarYDescargarPDF al hacer clic en el botón', () => {
    // Simular datos de entrada necesarios
    const nombre = 'John';
    const apellido = 'Doe';
    const ingresos = [
      {
        registros: [
          {
            fecha_registro: '2023-05-01',
            hora_ingreso_manana: '9:00',
            hora_salida_manana: '12:00',
            hora_ingreso: '13:00',
            hora_salida: '18:00',
            total_pagar: '100000',
          },
          // Otros registros...
        ],
      },
      // Otros empleados...
    ];

    // Espiar la función generarYDescargarPDF
    const generarYDescargarPDFSpy = jest.spyOn(App.prototype, 'generarYDescargarPDF');

    // Renderizar el componente
    const wrapper = shallow(<App />);

    // Establecer los datos de entrada en el estado del componente
    wrapper.setState({ nombre, apellido, ingresos });

    // Simular el clic en el botón que llama a generarYDescargarPDF
    wrapper.find('button').simulate('click');

    // Verificar si generarYDescargarPDF ha sido llamada
    expect(generarYDescargarPDFSpy).toHaveBeenCalled();

    // Restaurar la función espiada
    generarYDescargarPDFSpy.mockRestore();
  });
});