import { useState, useEffect } from 'react';
import { useExpenses } from '../utils/expenseContext';
import styles from '../styles/ExpenseForm.module.css';

interface Expense {
  id?: string;
  name: string;
  amount: number;
  category: string;
  color: string;
}

interface ExpenseFormProps {
  onClose: () => void;
  onSubmit: (expense: Omit<Expense, 'id'>) => void; // Exclui 'id' ao enviar
  initialData?: Expense; // Permite pré-preencher o formulário com dados completos
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onClose, onSubmit, initialData }) => {
  const { addExpense } = useExpenses();
  const [name, setName] = useState(initialData?.name || '');
  const [amount, setAmount] = useState(initialData?.amount?.toString() || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [color, setColor] = useState(initialData?.color || '#117554');
  const [errors, setErrors] = useState<{ name: string; amount: string; category: string }>({
    name: '',
    amount: '',
    category: '',
  });

  useEffect(() => {
    // Pré-preenche o formulário com os dados iniciais, se fornecidos
    if (initialData) {
      setName(initialData.name);
      setAmount(initialData.amount.toString());
      setCategory(initialData.category);
      setColor(initialData.color);
    }
  }, [initialData]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', amount: '', category: '' };

    if (!name.trim()) {
      newErrors.name = 'O nome da despesa é obrigatório.';
      valid = false;
    }

    if (!amount.trim() || isNaN(Number(amount))) {
      newErrors.amount = 'O valor deve ser um número válido.';
      valid = false;
    }

    if (!category.trim()) {
      newErrors.category = 'A categoria é obrigatória.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const expenseData: Expense = {
        name,
        amount: parseFloat(amount),
        category,
        color,
      };
      onSubmit(expenseData); // Chama a função onSubmit passada como prop
      setName('');
      setAmount('');
      setCategory('');
      setColor('#117554');
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        placeholder="Nome da despesa"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <span className={styles.error}>{errors.name}</span>}

      <input
        className={styles.input}
        placeholder="Valor"
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      {errors.amount && <span className={styles.error}>{errors.amount}</span>}

      <input
        className={styles.input}
        placeholder="Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {errors.category && <span className={styles.error}>{errors.category}</span>}

      <div className={styles.colorPickerContainer}>
        <label className={styles.colorLabel}>Escolha uma cor para a despesa:</label>
        <input
          className={styles.colorInput}
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div className={styles.modalActions}>
        <button type="button" className={styles.cancelButton} onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className={styles.saveButton}>
          Salvar
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;