"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import { Search, Filter, Loader2, Eye, Trash2, RefreshCw, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/status-badge";
import { NovedadDetailModal } from "@/components/admin/novedad-detail-modal";
import { toast } from "sonner";
import type { Novedad, NovedadEstado } from "@/types/novedad";
import type { NovedadFormValues } from "@/utils/validators";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("No se pudieron cargar las novedades");
      }
      return res.json();
    })
    .then((data) => data.data as Novedad[]);

const STATUS_FILTERS: Array<"Todos" | NovedadEstado> = [
  "Todos",
  "Pendiente",
  "En proceso",
  "Finalizada",
];

const ITEMS_PER_PAGE = 8;

export function AdminDashboard() {
  const { data, error, isLoading, mutate } = useSWR<Novedad[]>("/api/novedades", fetcher, {
    refreshInterval: 15000,
  });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"Todos" | NovedadEstado>("Todos");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Novedad | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const list = data ?? [];
    return list.filter((item) => {
      const matchesStatus = status === "Todos" || item.estado === status;
      const matchesSearch =
        search.length === 0 ||
        item.nombreCompleto.toLowerCase().includes(search.toLowerCase()) ||
        item.cedula.includes(search);
      return matchesStatus && matchesSearch;
    });
  }, [data, status, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const stats = useMemo(() => {
    const list = data ?? [];
    const groups = {
      total: list.length,
      pendientes: list.filter((item) => item.estado === "Pendiente").length,
      enProceso: list.filter((item) => item.estado === "En proceso").length,
      finalizadas: list.filter((item) => item.estado === "Finalizada").length,
    };
    return groups;
  }, [data]);

  const handleOpenModal = (novedad: Novedad) => {
    setSelected(novedad);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (id: string, estado: NovedadEstado) => {
    try {
      setIsUpdating(id);
      const response = await fetch(`/api/novedades/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
      });
      if (!response.ok) {
        throw new Error("No se pudo actualizar el estado");
      }
      toast.success("Estado actualizado", {
        description: `La novedad ahora está ${estado}.`,
      });
      void mutate();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      toast.error("Error al actualizar", { description: message });
    } finally {
      setIsUpdating(null);
    }
  };

  const handleSave = async (id: string, values: Partial<NovedadFormValues>) => {
    try {
      setIsUpdating(id);
      const response = await fetch(`/api/novedades/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("No se pudieron guardar los cambios");
      }
      toast.success("✅ Novedad actualizada con éxito");
      setIsModalOpen(false);
      void mutate();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      toast.error("Ocurrió un error al guardar", { description: message });
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      const response = await fetch(`/api/novedades/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("No se pudo eliminar la novedad");
      }
      toast.success("🗑 Novedad eliminada correctamente");
      setSelected(null);
      void mutate();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      toast.error("No se pudo eliminar", { description: message });
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <section className="space-y-8 px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between pb-2 border-b border-border/50">
        <div>
          <motion.h1
            className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Panel administrativo
          </motion.h1>
          <p className="text-base text-muted-foreground">
            Revisa las novedades recibidas, filtra por estado y gestiona.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => void mutate()} 
          className="shadow-sm hover:shadow-md transition-all border-primary/30 hover:border-primary/50 bg-card/50 backdrop-blur-sm"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Actualizar
        </Button>
      </header>

      <StatsRow stats={stats} isLoading={isLoading} />

      <Card className="border border-border/60 bg-card/98 shadow-2xl shadow-primary/30 backdrop-blur-xl ring-1 ring-primary/5">
        <CardHeader className="space-y-4 pb-0">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-primary via-primary-light to-accent p-2 shadow-lg shadow-primary/30">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Filtros y búsqueda</CardTitle>
              <CardDescription className="mt-1">
                Encuentra novedades por nombre, cédula o estado. Los resultados se actualizan en tiempo
                real.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o cédula..."
              className="pl-10"
              value={search}
              onChange={(event) => {
                setPage(1);
                setSearch(event.target.value);
              }}
            />
          </div>

          <Select
            value={status}
            onValueChange={(value) => {
              setPage(1);
              setStatus(value as "Todos" | NovedadEstado);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_FILTERS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center justify-between md:col-span-1 lg:col-span-1">
            <p className="text-sm text-muted-foreground">
              Total filtrado: <span className="font-semibold text-foreground">{filtered.length}</span>
            </p>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Página {currentPage} / {totalPages}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/60 bg-card/98 shadow-2xl shadow-primary/30 backdrop-blur-xl ring-1 ring-primary/5">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-foreground">Listado de novedades</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                Gestiona cada novedad desde la tabla o explora más detalles en el modal.
              </CardDescription>
            </div>
            <Badge variant="outline" className="hidden md:inline-flex bg-primary/10 text-primary border-primary/30 font-semibold">
              {data?.length ?? 0} registradas
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error.message} onRetry={() => void mutate()} />
          ) : paginated.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="hidden overflow-hidden rounded-xl border border-border/50 md:block shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-b border-border/50">
                      <TableHead>Cédula</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Contacto</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Registrada</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginated.map((item) => (
                      <TableRow key={item._id} className="transition-colors hover:bg-muted/40 border-b border-border/30">
                        <TableCell className="font-medium">{item.cedula}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{item.nombreCompleto}</span>
                            <span className="text-xs text-muted-foreground">{item.descripcion.slice(0, 60)}...</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col text-sm">
                            <span>{item.correo}</span>
                            <span>{item.celular}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <StatusBadge estado={item.estado} />
                            <Select
                              value={item.estado}
                              onValueChange={(value) =>
                                void handleStatusChange(item._id, value as NovedadEstado)
                              }
                              disabled={isUpdating === item._id}
                            >
                              <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Estado" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pendiente">Pendiente</SelectItem>
                                <SelectItem value="En proceso">En proceso</SelectItem>
                                <SelectItem value="Finalizada">Finalizada</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col text-xs text-muted-foreground">
                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                            <span>{new Date(item.createdAt).toLocaleTimeString()}</span>
                          </div>
                        </TableCell>
                        <TableCell className="space-x-2 text-right">
                          <Button variant="outline" size="sm" onClick={() => handleOpenModal(item)} className="shadow-sm hover:shadow-md transition-shadow">
                            <Eye className="mr-1 h-4 w-4" />
                            Ver
                          </Button>
                          <DeleteButton
                            novedad={item}
                            isDeleting={isDeleting === item._id}
                            onConfirm={() => void handleDelete(item._id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="grid gap-4 md:hidden">
                {paginated.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-border/60 bg-card/98 p-5 shadow-lg shadow-primary/30 backdrop-blur-xl ring-1 ring-primary/5 hover:shadow-xl hover:shadow-primary/40 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{item.nombreCompleto}</h3>
                        <p className="text-xs text-muted-foreground">{item.cedula}</p>
                      </div>
                      <StatusBadge estado={item.estado} />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{item.descripcion}</p>
                    <div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground">
                      <span>Correo: {item.correo}</span>
                      <span>Celular: {item.celular}</span>
                      <span>
                        Registrada: {new Date(item.createdAt).toLocaleDateString()}{" "}
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Select
                        value={item.estado}
                        onValueChange={(value) => void handleStatusChange(item._id, value as NovedadEstado)}
                        disabled={isUpdating === item._id}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendiente">Pendiente</SelectItem>
                          <SelectItem value="En proceso">En proceso</SelectItem>
                          <SelectItem value="Finalizada">Finalizada</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" className="flex-1" onClick={() => handleOpenModal(item)}>
                        <Eye className="mr-1 h-4 w-4" />
                        Ver detalle
                      </Button>
                      <DeleteButton
                        novedad={item}
                        isDeleting={isDeleting === item._id}
                        onConfirm={() => void handleDelete(item._id)}
                        isFullWidth
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <PaginationControls
                page={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </CardContent>
      </Card>

      <NovedadDetailModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        novedad={selected}
        onSave={handleSave}
        isSaving={isUpdating !== null}
      />
    </section>
  );
}

function StatsRow({
  stats,
  isLoading,
}: {
  stats: { total: number; pendientes: number; enProceso: number; finalizadas: number };
  isLoading: boolean;
}) {
  const cards = [
    {
      title: "Total novedades",
      value: stats.total,
      description: "Acumulado histórico registrado.",
      accent: "from-primary/20 via-primary-light/15 to-accent/20",
      iconColor: "text-primary",
    },
    {
      title: "Pendientes",
      value: stats.pendientes,
      description: "En espera de revisión.",
      accent: "from-primary/20 via-primary-light/10 to-transparent",
      iconColor: "text-primary-light",
    },
    {
      title: "En proceso",
      value: stats.enProceso,
      description: "Se están gestionando actualmente.",
      accent: "from-primary-light/20 via-accent/15 to-transparent",
      iconColor: "text-accent",
    },
    {
      title: "Finalizadas",
      value: stats.finalizadas,
      description: "Cerradas satisfactoriamente.",
      accent: "from-accent/20 via-primary/10 to-transparent",
      iconColor: "text-primary",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="relative overflow-hidden border border-border/60 bg-card/98 shadow-lg shadow-primary/30 backdrop-blur-xl ring-1 ring-primary/5 hover:shadow-xl hover:shadow-primary/40 transition-all"
        >
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent}`}
            aria-hidden="true"
          />
          <CardHeader className="relative space-y-2 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">{card.title}</CardTitle>
            <CardDescription className="text-xs">{card.description}</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            {isLoading ? (
              <Skeleton className="h-12 w-20 rounded-lg" />
            ) : (
              <motion.p
                key={card.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-4xl font-bold text-foreground"
              >
                {card.value}
              </motion.p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-center">
      <BarChart3 className="h-8 w-8 text-destructive" />
      <p className="text-sm text-destructive">{message}</p>
      <Button variant="outline" onClick={onRetry}>
        Reintentar
      </Button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20 p-8 text-center">
      <BarChart3 className="h-10 w-10 text-muted-foreground" />
      <div>
        <h3 className="text-lg font-semibold text-foreground">No se encontraron novedades</h3>
        <p className="text-sm text-muted-foreground">
          Ajusta los filtros o espera nuevas novedades en tiempo real.
        </p>
      </div>
    </div>
  );
}

function PaginationControls({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Mostrando página <span className="font-semibold text-foreground">{page}</span> de{" "}
        <span className="font-semibold text-foreground">{totalPages}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

function DeleteButton({
  novedad,
  isDeleting,
  onConfirm,
  isFullWidth,
}: {
  novedad: Novedad;
  isDeleting: boolean;
  onConfirm: () => void;
  isFullWidth?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button
        variant="destructive"
        size="sm"
        className={isFullWidth ? "w-full" : ""}
        onClick={() => setOpen(true)}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="mr-1 h-4 w-4" />
        )}
        Eliminar
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar esta novedad?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará la novedad de{" "}
            <strong>{novedad.nombreCompleto}</strong> registrada el{" "}
            {new Date(novedad.createdAt).toLocaleDateString()}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Confirmar eliminación
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

