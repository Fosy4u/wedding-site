"use client";

import { FormEvent, useMemo, useState } from "react";

type AdminRsvpItem = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  attending: "yes" | "no";
  plusOne: "yes" | "no";
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [items, setItems] = useState<AdminRsvpItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [attendingFilter, setAttendingFilter] = useState<"all" | "yes" | "no">(
    "all",
  );
  const [isExporting, setIsExporting] = useState(false);

  const total = useMemo(() => items.length, [items]);
  const approvedCount = useMemo(
    () => items.filter((item) => item.status === "approved").length,
    [items],
  );
  const rejectedCount = useMemo(
    () => items.filter((item) => item.status === "rejected").length,
    [items],
  );
  const pendingCount = useMemo(
    () => items.filter((item) => item.status === "pending").length,
    [items],
  );

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return items.filter((item) => {
      const statusMatch =
        statusFilter === "all" ? true : item.status === statusFilter;
      const attendingMatch =
        attendingFilter === "all" ? true : item.attending === attendingFilter;

      const searchMatch =
        normalizedSearch.length === 0
          ? true
          : [item.fullName, item.email, item.phone, item.message]
              .join(" ")
              .toLowerCase()
              .includes(normalizedSearch);

      return statusMatch && attendingMatch && searchMatch;
    });
  }, [items, search, statusFilter, attendingFilter]);

  const getExportRows = (source: AdminRsvpItem[]) => {
    return source.map((item) => ({
      Name: item.fullName,
      Email: item.email,
      Phone: item.phone,
      Attending: item.attending,
      PlusOne: item.plusOne,
      Status: item.status,
      Message: item.message || "",
      SubmittedAt: new Date(item.createdAt).toLocaleString(),
    }));
  };

  const exportToExcel = async (
    mode: "all" | "approved" | "rejected" | "filtered",
  ) => {
    setIsExporting(true);
    setError("");

    try {
      const XLSX = await import("xlsx");

      const source =
        mode === "all"
          ? items
          : mode === "approved"
            ? items.filter((item) => item.status === "approved")
            : mode === "rejected"
              ? items.filter((item) => item.status === "rejected")
              : filteredItems;

      if (source.length === 0) {
        setError("No records available for this export.");
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(getExportRows(source));
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "RSVPs");

      const date = new Date().toISOString().slice(0, 10);
      const fileName = `rsvp-${mode}-${date}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    } catch (exportError) {
      setError(
        exportError instanceof Error
          ? exportError.message
          : "Unable to export records",
      );
    } finally {
      setIsExporting(false);
    }
  };

  const loadData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/rsvps?key=${encodeURIComponent(key)}`,
        { cache: "no-store" },
      );

      const data = (await response.json()) as {
        items?: AdminRsvpItem[];
        message?: string;
      };

      if (!response.ok) {
        throw new Error(data.message || "Unable to load records");
      }

      setItems(data.items || []);
    } catch (fetchError) {
      setItems([]);
      setError(
        fetchError instanceof Error ? fetchError.message : "Unable to load",
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    id: string,
    status: "pending" | "approved" | "rejected",
  ) => {
    setUpdatingId(id);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/rsvps/${id}?key=${encodeURIComponent(key)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      const data = (await response.json()) as {
        item?: AdminRsvpItem;
        message?: string;
      };

      if (!response.ok || !data.item) {
        throw new Error(data.message || "Unable to update RSVP");
      }

      setItems((current) =>
        current.map((item) => (item._id === id ? data.item! : item)),
      );
    } catch (updateError) {
      setError(
        updateError instanceof Error ? updateError.message : "Unable to update",
      );
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] px-4 py-10">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-soft-gold)]">
            Admin
          </p>
          <h1 className="font-heading text-4xl text-[var(--color-warm-black)]">
            RSVP Submissions
          </h1>
          <p className="text-sm text-[var(--color-muted-green)]/80">
            Enter your admin key to view RSVP interest submissions.
          </p>
        </header>

        <form
          onSubmit={loadData}
          className="flex flex-wrap items-end gap-3 rounded-2xl border border-[var(--color-soft-gold)]/25 bg-white/80 p-4"
        >
          <label className="min-w-[260px] flex-1 space-y-2">
            <span className="text-sm">Admin key</span>
            <input
              value={key}
              onChange={(event) => setKey(event.target.value)}
              type="password"
              required
              className="w-full rounded-xl border border-[var(--color-soft-gold)]/35 bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-burgundy)] focus:ring-2 focus:ring-[var(--color-burgundy)]/25"
              placeholder="Enter ADMIN_DASHBOARD_KEY"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-burgundy)] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-ivory)] transition hover:bg-[var(--color-burgundy-2)] disabled:opacity-60"
          >
            {loading ? "Loading..." : "Load RSVPs"}
          </button>
        </form>

        {error ? (
          <p className="rounded-xl border border-[var(--color-burgundy)]/25 bg-[var(--color-burgundy)]/10 px-4 py-3 text-sm text-[var(--color-burgundy)]">
            {error}
          </p>
        ) : null}

        <section className="space-y-3">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="rounded-xl border border-[var(--color-soft-gold)]/25 bg-white/80 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted-green)]/65">
                Total
              </p>
              <p className="mt-1 font-heading text-2xl text-[var(--color-warm-black)]">
                {total}
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-soft-gold)]/25 bg-white/80 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted-green)]/65">
                Approved
              </p>
              <p className="mt-1 font-heading text-2xl text-emerald-700">
                {approvedCount}
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-soft-gold)]/25 bg-white/80 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted-green)]/65">
                Rejected
              </p>
              <p className="mt-1 font-heading text-2xl text-[var(--color-burgundy)]">
                {rejectedCount}
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-soft-gold)]/25 bg-white/80 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted-green)]/65">
                Pending
              </p>
              <p className="mt-1 font-heading text-2xl text-amber-700">
                {pendingCount}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-[var(--color-soft-gold)]/25 bg-white/80 p-4">
            <label className="min-w-[220px] flex-1 space-y-2">
              <span className="text-sm">Search</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-xl border border-[var(--color-soft-gold)]/35 bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-burgundy)] focus:ring-2 focus:ring-[var(--color-burgundy)]/25"
                placeholder="Search name, email, phone, message"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm">Status</span>
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as
                      | "all"
                      | "pending"
                      | "approved"
                      | "rejected",
                  )
                }
                className="rounded-xl border border-[var(--color-soft-gold)]/35 bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-burgundy)] focus:ring-2 focus:ring-[var(--color-burgundy)]/25"
              >
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm">Attending</span>
              <select
                value={attendingFilter}
                onChange={(event) =>
                  setAttendingFilter(event.target.value as "all" | "yes" | "no")
                }
                className="rounded-xl border border-[var(--color-soft-gold)]/35 bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-burgundy)] focus:ring-2 focus:ring-[var(--color-burgundy)]/25"
              >
                <option value="all">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setAttendingFilter("all");
              }}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--color-soft-gold)]/50 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-green)] transition hover:bg-[var(--color-muted-beige)]/45"
            >
              Reset Filters
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={isExporting || items.length === 0}
              onClick={() => void exportToExcel("all")}
              className="rounded-full bg-[var(--color-burgundy)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ivory)] disabled:opacity-60"
            >
              Export All (Excel)
            </button>
            <button
              type="button"
              disabled={isExporting || approvedCount === 0}
              onClick={() => void exportToExcel("approved")}
              className="rounded-full border border-emerald-600/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 disabled:opacity-60"
            >
              Export Approved
            </button>
            <button
              type="button"
              disabled={isExporting || rejectedCount === 0}
              onClick={() => void exportToExcel("rejected")}
              className="rounded-full border border-[var(--color-burgundy)]/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-burgundy)] disabled:opacity-60"
            >
              Export Rejected
            </button>
            <button
              type="button"
              disabled={isExporting || filteredItems.length === 0}
              onClick={() => void exportToExcel("filtered")}
              className="rounded-full border border-[var(--color-soft-gold)]/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-green)] disabled:opacity-60"
            >
              Export Current View
            </button>
          </div>

          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted-green)]/70">
            Showing {filteredItems.length} of {total} records
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[var(--color-soft-gold)]/25 bg-white/80">
            <table className="w-full min-w-[840px] text-left text-sm">
              <thead className="bg-[var(--color-muted-beige)]/45 text-xs uppercase tracking-[0.16em] text-[var(--color-muted-green)]/75">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Attend</th>
                  <th className="px-4 py-3">Plus One</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-[var(--color-soft-gold)]/20"
                  >
                    <td className="px-4 py-3">{item.fullName}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3">{item.phone}</td>
                    <td className="px-4 py-3 uppercase">{item.attending}</td>
                    <td className="px-4 py-3 uppercase">{item.plusOne}</td>
                    <td className="px-4 py-3 uppercase">{item.status}</td>
                    <td className="px-4 py-3">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateStatus(item._id, "approved")}
                          disabled={updatingId === item._id}
                          className="rounded-full border border-emerald-600/35 px-3 py-1 text-xs uppercase tracking-[0.12em] text-emerald-700 disabled:opacity-60"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStatus(item._id, "rejected")}
                          disabled={updatingId === item._id}
                          className="rounded-full border border-[var(--color-burgundy)]/35 px-3 py-1 text-xs uppercase tracking-[0.12em] text-[var(--color-burgundy)] disabled:opacity-60"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-8 text-center text-sm text-[var(--color-muted-green)]/70"
                    >
                      No records yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
