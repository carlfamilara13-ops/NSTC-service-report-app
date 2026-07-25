import { createContext, useContext, useState, useEffect } from 'react';

const FormContext = createContext();

const initialState = {
  projectNo: '', client: '', address: '', contactPerson: '',
  serviceNumber: '', underWarranty: '', dateCalled: '', dateServiced: '',
  reportedProblem: '', actionTaken: '', pendingItems: '',
  nstcNames: '', nstcContactNumber: '', dateIn: '', timeIn: '', dateOut: '', timeOut: '',
  clientRepName: '', clientRepContact: '', clientComments: '', clientDate: '',
  nstcSignature: null,
  clientSignature: null,
  beforePhotos: [],
  afterPhotos: [],
};

export function FormProvider({ children }) {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('draftReport');
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    try {
      localStorage.setItem('draftReport', JSON.stringify(formData));
    } catch (err) {
      console.warn('Autosave failed (storage quota exceeded):', err);
      // Data still exists in memory/state, just won't persist across refresh
    }
  }, [formData]);

  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const resetForm = () => setFormData(initialState);

  return (
    <FormContext.Provider value={{ formData, updateField, resetForm }}>
      {children}
    </FormContext.Provider>
  );
}

export const useFormData = () => useContext(FormContext);