const AdminMainLayout = ({ sidebar, content }) => (
    <main className="flex container mx-auto px-4 pt-12 pb-16 min-h-[900px]">
        {sidebar}
        <section className="flex-1 bg-white rounded-2xl shadow-lg p-10 min-h-[800px]">
            {content}
        </section>
    </main>
);
export default AdminMainLayout;
