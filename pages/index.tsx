import Head from 'next/head';
import { useState } from 'react';
import { useExpenses } from '../utils/expenseContext';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseChart from '../components/ExpenseChart';
import styles from '../styles/Home.module.css';

// Define o tipo de uma despesa, sem o `id`
interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  color: string;
}

export default function Home() {
  const { addExpense } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Define o tipo `Omit<Expense, 'id'>` para o parâmetro `expense`
  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    addExpense({
      id: Math.random().toString(36).substring(7),
      ...expense,
    });
    closeModal(); // Fecha o modal após adicionar a despesa
  };

  return (
    <>
      <Head>
        <title>Fluxo+ | Página Inicial</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.headerContainer}>
          <h2 className={styles.title}>Despesas</h2>
          <button className={styles.createExpenseButton} onClick={openModal}>
            + Criar Despesa
          </button>
        </div>
        <ExpenseList />
        <ExpenseChart />

        {/* Modal para adicionar despesa */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <button className={styles.closeButton} onClick={closeModal}>
                <svg height="15px" width="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460.775 460.775">
                  <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
                    c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
                    c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
                    c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
                    l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
                    c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
                </svg>
              </button>
              <h2 className={styles.heading}>Adicionar Despesa</h2>
              <ExpenseForm onClose={closeModal} onSubmit={handleAddExpense} />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
