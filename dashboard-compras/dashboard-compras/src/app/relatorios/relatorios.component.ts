import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html'
})
export class RelatoriosComponent implements AfterViewInit {
  constructor() {
    // Registra os componentes necessários do Chart.js
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    const ctx = document.getElementById('comprasChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fev', 'Mar'], // Meses
          datasets: [{
            label: 'Gastos (R$)',
            data: [1200, 1900, 3000], // Valores
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Elemento canvas não encontrado!');
    }
    const ctx2 = document.getElementById('tendenciasComprasChart') as HTMLCanvasElement;
    if (ctx2) {
      new Chart(ctx2, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar'], // Meses
          datasets: [{
            label: 'Tendências de Compras',
            data: [1200, 1900, 3000], // Valores
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Elemento canvas não encontrado!');
    }

  }
}
