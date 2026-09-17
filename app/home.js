import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Home() {
  const transacoes = [
    {
      id: 1,
      nome: "Salário",
      categoria: "Receita",
      valor: "+ R$ 2.500,00",
      icone: "cash-outline",
      tipo: "receita",
    },
    {
      id: 2,
      nome: "Supermercado",
      categoria: "Alimentação",
      valor: "- R$ 180,50",
      icone: "cart-outline",
      tipo: "despesa",
    },
    {
      id: 3,
      nome: "Netflix",
      categoria: "Assinaturas",
      valor: "- R$ 39,90",
      icone: "play-circle-outline",
      tipo: "despesa",
    },
    {
      id: 4,
      nome: "Freelance",
      categoria: "Renda extra",
      valor: "+ R$ 450,00",
      icone: "briefcase-outline",
      tipo: "receita",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá 👋</Text>
            <Text style={styles.title}>Meu Bolso</Text>
          </View>

          <TouchableOpacity style={styles.notification}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#222"
            />
          </TouchableOpacity>
        </View>

        {/* SALDO */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo disponível</Text>

          <Text style={styles.balance}>
            R$ 3.729,60
          </Text>

          <View style={styles.balanceFooter}>
            <View>
              <Text style={styles.smallLabel}>Este mês</Text>
              <Text style={styles.balancePositive}>+ 12,5%</Text>
            </View>

            <Ionicons
              name="trending-up-outline"
              size={32}
              color="#fff"
            />
          </View>
        </View>

        {/* RESUMO */}
        <View style={styles.summary}>
          <View style={styles.summaryCard}>
            <View style={[styles.iconBox, styles.green]}>
              <Ionicons
                name="arrow-down-outline"
                size={22}
                color="#16A34A"
              />
            </View>

            <Text style={styles.summaryLabel}>Receitas</Text>
            <Text style={styles.income}>R$ 2.950,00</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.iconBox, styles.red]}>
              <Ionicons
                name="arrow-up-outline"
                size={22}
                color="#DC2626"
              />
            </View>

            <Text style={styles.summaryLabel}>Despesas</Text>
            <Text style={styles.expense}>R$ 580,40</Text>
          </View>
        </View>

        {/* BOTÃO ADICIONAR */}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>
            Adicionar movimentação
          </Text>
        </TouchableOpacity>

        {/* RESUMO MENSAL */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Resumo mensal</Text>

          <TouchableOpacity>
            <Text style={styles.seeAll}>Ver detalhes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartLabel}>Economizado</Text>
              <Text style={styles.chartValue}>R$ 2.369,60</Text>
            </View>

            <View style={styles.percentBox}>
              <Text style={styles.percent}>+ 18%</Text>
            </View>
          </View>

          {/* BARRAS */}
          <View style={styles.chart}>
            {[45, 70, 55, 85, 60, 95, 75].map((height, index) => (
              <View key={index} style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    { height: height },
                  ]}
                />
                <Text style={styles.day}>
                  {["S", "T", "Q", "Q", "S", "S", "D"][index]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* TRANSAÇÕES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Transações recentes
          </Text>

          <TouchableOpacity>
            <Text style={styles.seeAll}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactions}>
          {transacoes.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.transaction}
            >
              <View style={styles.transactionLeft}>
                <View style={styles.transactionIcon}>
                  
                </View>

                <View>
                  <Text style={styles.transactionName}>
                    {item.nome}
                  </Text>

                  <Text style={styles.transactionCategory}>
                    {item.categoria}
                  </Text>
                </View>
              </View>

              <Text
                style={[
                  styles.transactionValue,
                  item.tipo === "receita"
                    ? styles.income
                    : styles.expense,
                ]}
              >
                {item.valor}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* MENU INFERIOR */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="home" size={24} color="#2563EB" />
          <Text style={styles.activeMenu}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            name="swap-horizontal-outline"
            size={24}
            color="#777"
          />
          <Text style={styles.menuText}>Transações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            name="pie-chart-outline"
            size={24}
            color="#777"
          />
          <Text style={styles.menuText}>Relatórios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            name="person-outline"
            size={24}
            color="#777"
          />
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  scroll: {
    padding: 20,
    paddingBottom: 110,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  greeting: {
    fontSize: 14,
    color: "#777",
    marginBottom: 3,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#171717",
  },

  notification: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  balanceCard: {
    backgroundColor: "#2563EB",
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
  },

  balanceLabel: {
    color: "#DCE7FF",
    fontSize: 14,
  },

  balance: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 7,
    marginBottom: 22,
  },

  balanceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallLabel: {
    color: "#DCE7FF",
    fontSize: 12,
  },

  balancePositive: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 2,
  },

  summary: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  green: {
    backgroundColor: "#DCFCE7",
  },

  red: {
    backgroundColor: "#FEE2E2",
  },

  summaryLabel: {
    color: "#777",
    fontSize: 13,
    marginBottom: 5,
  },

  income: {
    color: "#16A34A",
    fontWeight: "700",
  },

  expense: {
    color: "#DC2626",
    fontWeight: "700",
  },

  addButton: {
    backgroundColor: "#171717",
    height: 54,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 28,
  },

  addButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#171717",
  },

  seeAll: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "600",
  },

  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 28,
  },

  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chartLabel: {
    color: "#777",
    fontSize: 13,
  },

  chartValue: {
    fontSize: 21,
    fontWeight: "700",
    marginTop: 4,
  },

  percentBox: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  percent: {
    color: "#16A34A",
    fontWeight: "700",
    fontSize: 12,
  },

  chart: {
    height: 130,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 20,
  },

  barContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: 130,
  },

  bar: {
    width: 20,
    backgroundColor: "#2563EB",
    borderRadius: 6,
    marginBottom: 7,
  },

  day: {
    fontSize: 11,
    color: "#999",
  },

  transactions: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
  },

  transaction: {
    minHeight: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  transactionIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#F1F3F7",
    justifyContent: "center",
    alignItems: "center",
  },

  transactionName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },

  transactionCategory: {
    fontSize: 12,
    color: "#999",
    marginTop: 3,
  },

  transactionValue: {
    fontSize: 13,
    fontWeight: "700",
  },

  bottomMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  menuItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  activeMenu: {
    color: "#2563EB",
    fontSize: 11,
    marginTop: 4,
    fontWeight: "600",
  },

  menuText: {
    color: "#777",
    fontSize: 11,
    marginTop: 4,
  },
});